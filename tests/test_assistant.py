import asyncio

import httpx
import pytest
from pydantic import ValidationError

from backend.config import Settings
from backend.main import app
from backend.schemas.assistant import AssistantRequest
from backend.services.assistant_service import AssistantService, AssistantServiceError
from fastapi.testclient import TestClient


client = TestClient(app)


def request(language: str = "en") -> AssistantRequest:
    return AssistantRequest(
        question="What should I do about this disease?",
        language=language,
        context={
            "crop": "Tomato",
            "disease": "Tomato Early Blight",
            "severity": "High",
            "confidence": 94,
            "riskScore": 81,
            "riskReasons": ["High disease severity"],
            "location": "Hyderabad",
        },
    )


def test_assistant_rejects_blank_question() -> None:
    with pytest.raises(ValidationError):
        AssistantRequest(question="  ", language="en")


def test_missing_key_returns_explicit_fallback() -> None:
    result = asyncio.run(AssistantService(Settings()).answer(request("hi")))
    assert result.mode == "FALLBACK"
    assert "AI" in result.answer
    assert result.warnings


def test_language_is_propagated_to_provider_prompt() -> None:
    prompt = AssistantService._build_prompt(request("te"))
    assert "Telugu only" in prompt
    assert "Tomato Early Blight" in prompt


def test_successful_provider_response_is_validated(monkeypatch: pytest.MonkeyPatch) -> None:
    service = AssistantService(Settings(gemini_api_key="test-key"))

    async def fake_fetch(_: AssistantRequest) -> dict[str, object]:
        return {"candidates": [{"content": {"parts": [{"text": '{"answer":"Inspect the lower leaves.","actions":["Monitor moisture."],"warnings":[],"followUp":"Would you like a rescan interval?"}'}]}}]}

    monkeypatch.setattr(service, "_fetch_gemini", fake_fetch)
    result = asyncio.run(service.answer(request()))
    assert result.mode == "AI"
    assert result.actions == ["Monitor moisture."]


def test_malformed_provider_response_is_controlled(monkeypatch: pytest.MonkeyPatch) -> None:
    service = AssistantService(Settings(gemini_api_key="test-key"))

    async def fake_fetch(_: AssistantRequest) -> dict[str, object]:
        return {"candidates": [{"content": {"parts": [{"text": '{"answer":""}'}]}}]}

    monkeypatch.setattr(service, "_fetch_gemini", fake_fetch)
    with pytest.raises(AssistantServiceError, match="invalid"):
        asyncio.run(service.answer(request()))


def test_provider_timeout_is_controlled(monkeypatch: pytest.MonkeyPatch) -> None:
    service = AssistantService(Settings(gemini_api_key="test-key"))

    async def failed_fetch(_: AssistantRequest) -> dict[str, object]:
        raise httpx.ReadTimeout("timed out")

    monkeypatch.setattr(service, "_fetch_gemini", failed_fetch)
    with pytest.raises(AssistantServiceError, match="temporarily unavailable"):
        asyncio.run(service.answer(request()))


def test_assistant_endpoint_returns_fallback_without_key() -> None:
    response = client.post("/api/assistant", json={"question": "What should I monitor?", "language": "en"})
    assert response.status_code == 200
    assert response.json()["mode"] == "FALLBACK"
