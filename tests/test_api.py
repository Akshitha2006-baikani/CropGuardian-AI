from fastapi.testclient import TestClient

from backend.main import app


client = TestClient(app)


def test_health_endpoint() -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_weather_without_provider_is_controlled() -> None:
    response = client.get("/api/weather", params={"location": "Hyderabad"})
    assert response.status_code == 200
    assert response.json() == {
        "available": False,
        "message": "Weather service is not configured.",
    }


def test_weather_without_location_is_controlled() -> None:
    response = client.get("/api/weather")
    assert response.status_code == 200
    assert response.json() == {
        "available": False,
        "message": "Add your farm location to view weather.",
    }


def test_analyze_rejects_unsupported_crop() -> None:
    response = client.post(
        "/api/analyze",
        data={"crop": "Maize", "mode": "ai"},
        files={"image": ("leaf.jpg", b"not-an-image", "image/jpeg")},
    )
    assert response.status_code == 422
    assert "not supported" in response.json()["detail"]


def test_analyze_rejects_non_image_upload() -> None:
    response = client.post(
        "/api/analyze",
        data={"crop": "Tomato", "mode": "ai"},
        files={"image": ("leaf.txt", b"text", "text/plain")},
    )
    assert response.status_code == 400
    assert "valid image" in response.json()["detail"]


def test_analyze_rejects_mismatched_image_extension() -> None:
    response = client.post(
        "/api/analyze",
        data={"crop": "Tomato", "mode": "ai"},
        files={"image": ("leaf.png", b"jpeg-bytes", "image/jpeg")},
    )
    assert response.status_code == 400
    assert "JPG, PNG, or WEBP" in response.json()["detail"]


def test_risk_endpoint_supports_baseline_without_weather() -> None:
    response = client.post("/api/risk", json={"confidence": 94, "severity": "High"})
    assert response.status_code == 200
    assert response.json()["riskScore"] == 81
    assert response.json()["weatherFactors"] == []


def test_risk_endpoint_includes_weather_factors() -> None:
    response = client.post("/api/risk", json={
        "confidence": 94,
        "severity": "High",
        "weather": {
            "available": True,
            "location": "Hyderabad",
            "temperature": 29,
            "humidity": 85,
            "rainProbability": 70,
            "rainfall": 4.2,
            "windSpeed": 12,
            "condition": "Partly cloudy",
            "timestamp": "2026-09-25T10:30:00Z",
        },
    })
    assert response.status_code == 200
    assert response.json()["riskScore"] == 91
    assert response.json()["weatherFactors"]
