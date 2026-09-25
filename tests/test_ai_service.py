import asyncio

import httpx
import pytest

from backend.config import Settings
from backend.services.ai_service import AIService, AIServiceError


def provider_payload() -> dict[str, object]:
    return {
        "candidates": [{"content": {"parts": [{"text": '{"crop":"Tomato","scientificName":"Solanum lycopersicum","disease":"Early Blight","pathogen":"Alternaria solani","confidence":92,"severity":"High","symptomsSummary":"Dark lesions with concentric rings."}'}]}}]
    }


def test_diagnosis_provider_response_is_validated() -> None:
    result = AIService._parse_provider_response(provider_payload())
    assert result.mode == "ai"
    assert result.confidence == 92


def test_malformed_diagnosis_provider_response_is_rejected() -> None:
    with pytest.raises((KeyError, ValueError)):
        AIService._parse_provider_response({"candidates": [{"content": {"parts": [{"text": '{"confidence":999}'}]}}]})


def test_diagnosis_without_key_is_controlled() -> None:
    with pytest.raises(AIServiceError, match="not configured"):
        asyncio.run(AIService(Settings()).analyze(b"image", "image/jpeg", "Tomato"))


def test_diagnosis_provider_timeout_is_controlled(monkeypatch: pytest.MonkeyPatch) -> None:
    service = AIService(Settings(gemini_api_key="test-key"))

    async def failed_fetch(image: bytes, mime_type: str, crop: str) -> dict[str, object]:
        raise httpx.ReadTimeout("timed out")

    monkeypatch.setattr(service, "_fetch_gemini", failed_fetch)
    with pytest.raises(AIServiceError, match="temporarily unavailable"):
        asyncio.run(service.analyze(b"image", "image/jpeg", "Tomato"))
