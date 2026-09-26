from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient

from backend.config import get_settings
from backend.database import get_connection
from backend.main import app


@pytest.fixture
def auth_client(tmp_path, monkeypatch: pytest.MonkeyPatch) -> Iterator[TestClient]:
    database_path = tmp_path / "cropguardian-auth-test.db"
    monkeypatch.setenv("DATABASE_URL", f"sqlite:///{database_path.as_posix()}")
    monkeypatch.setenv("AUTH_SECRET", "test-auth-secret-that-is-at-least-32-bytes-long")
    monkeypatch.setenv("AUTH_COOKIE_SECURE", "false")
    monkeypatch.setenv("AUTH_COOKIE_SAMESITE", "lax")
    get_settings.cache_clear()
    with TestClient(app) as client:
        yield client
    get_settings.cache_clear()


def register(client: TestClient, email: str, name: str = "Test Farmer") -> dict[str, object]:
    response = client.post("/api/auth/signup", json={
        "name": name,
        "email": email,
        "password": "cropguardian-secure-2026",
    })
    assert response.status_code == 201, response.text
    return response.json()


def test_signup_hashes_password_and_sets_http_only_cookie(auth_client: TestClient) -> None:
    user = register(auth_client, "farmer@example.com")
    assert user["name"] == "Test Farmer"
    assert "csrfToken" in user
    access_cookie = next(
        cookie for cookie in auth_client.cookies.jar
        if cookie.name == "cropguardian_access"
    )
    assert access_cookie.has_nonstandard_attr("HttpOnly")

    connection = get_connection()
    try:
        row = connection.execute(
            "SELECT password_hash FROM users WHERE email = ?",
            ("farmer@example.com",),
        ).fetchone()
    finally:
        connection.close()
    assert row is not None
    assert row["password_hash"].startswith("$2")
    assert row["password_hash"] != "cropguardian-secure-2026"


def test_remember_login_and_logout(auth_client: TestClient) -> None:
    anonymous_session = auth_client.get("/api/auth/me")
    assert anonymous_session.status_code == 200
    assert anonymous_session.json() is None

    register(auth_client, "remember@example.com")
    logout_response = auth_client.post("/api/auth/logout")
    assert logout_response.status_code == 200
    assert auth_client.get("/api/auth/me").json() is None

    response = auth_client.post("/api/auth/login", json={
        "email": "remember@example.com",
        "password": "cropguardian-secure-2026",
        "rememberMe": True,
    })
    assert response.status_code == 200
    assert "max-age=2592000" in response.headers["set-cookie"].lower()
    assert auth_client.get("/api/auth/me").json()["email"] == "remember@example.com"

    assert auth_client.post("/api/auth/logout").status_code == 200
    assert auth_client.get("/api/auth/me").json() is None


def test_user_data_requires_csrf_and_is_persisted(auth_client: TestClient) -> None:
    user = register(auth_client, "history@example.com")
    payload = {
        "question": "How should I irrigate tomato plants?",
        "response": {
            "answer": "Water at the base.",
            "actions": ["Keep leaves dry."],
            "warnings": [],
            "followUp": "Would you like more detail?",
            "mode": "AI",
        },
    }
    assert auth_client.post("/api/user/chat-history", json=payload).status_code == 403
    headers = {"X-CSRF-Token": user["csrfToken"]}
    saved_turn = auth_client.post("/api/user/chat-history", json=payload, headers=headers)
    assert saved_turn.status_code == 201
    assert auth_client.get("/api/user/chat-history").json()[0]["question"] == payload["question"]

    analysis = {
        "crop": "Tomato",
        "disease": "Early Blight",
        "confidence": 91,
        "severity": "Medium",
        "riskScore": 62,
        "riskLevel": "Monitor",
        "mode": "ai",
        "date": "Sep 26, 2026",
        "time": "10:30 AM",
    }
    saved_analysis = auth_client.post("/api/user/analyses", json=analysis, headers=headers)
    assert saved_analysis.status_code == 201
    analysis_id = saved_analysis.json()["id"]
    assert auth_client.get("/api/user/analyses").json()[0]["disease"] == "Early Blight"
    assert auth_client.delete(f"/api/user/analyses/{analysis_id}", headers=headers).status_code == 200

    updated_profile = auth_client.patch(
        "/api/user/profile",
        json={"preferredLanguage": "te"},
        headers=headers,
    )
    assert updated_profile.status_code == 200
    assert auth_client.get("/api/auth/me").json()["preferredLanguage"] == "te"

    assert auth_client.delete("/api/user/chat-history", headers=headers).status_code == 200
    assert auth_client.get("/api/user/chat-history").json() == []


def test_user_data_isolated_by_account(auth_client: TestClient) -> None:
    first_user = register(auth_client, "first@example.com")
    headers = {"X-CSRF-Token": first_user["csrfToken"]}
    response = {
        "answer": "Inspect the leaves.",
        "actions": [],
        "warnings": [],
        "followUp": "Need anything else?",
        "mode": "AI",
    }
    assert auth_client.post(
        "/api/user/chat-history",
        json={"question": "Check pests?", "response": response},
        headers=headers,
    ).status_code == 201

    with TestClient(app) as second_client:
        register(second_client, "second@example.com")
        assert second_client.get("/api/user/chat-history").json() == []
        assert second_client.get("/api/user/analyses").json() == []


def test_duplicate_signup_invalid_login_and_untrusted_origin(auth_client: TestClient) -> None:
    register(auth_client, "duplicate@example.com")
    duplicate = auth_client.post("/api/auth/signup", json={
        "name": "Another Farmer",
        "email": "DUPLICATE@example.com",
        "password": "cropguardian-secure-2026",
    })
    assert duplicate.status_code == 409

    auth_client.post("/api/auth/logout")
    invalid = auth_client.post("/api/auth/login", json={
        "email": "duplicate@example.com",
        "password": "incorrect-password",
    })
    assert invalid.status_code == 401
    assert invalid.json()["detail"] == "Invalid email or password."

    untrusted = auth_client.post(
        "/api/auth/login",
        headers={"Origin": "https://attacker.example"},
        json={"email": "duplicate@example.com", "password": "cropguardian-secure-2026"},
    )
    assert untrusted.status_code == 403