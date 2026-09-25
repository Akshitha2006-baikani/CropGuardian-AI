import json
from datetime import datetime, timezone
import base64
from typing import Any

import httpx

from backend.config import Settings
from backend.schemas.ai import AIResult


class AIServiceError(Exception):
    """Raised when an AI provider cannot return a valid diagnosis."""


class AIService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    async def analyze(self, image: bytes, mime_type: str, crop: str) -> AIResult:
        if not self.settings.gemini_api_key:
            raise AIServiceError("AI analysis is not configured on the server.")

        try:
            payload = await self._fetch_gemini(image, mime_type, crop)
            return self._parse_provider_response(payload)
        except (httpx.HTTPError, httpx.TimeoutException) as exc:
            raise AIServiceError("The AI provider is temporarily unavailable.") from exc
        except (KeyError, IndexError, TypeError, ValueError) as exc:
            raise AIServiceError("The AI provider returned an invalid response.") from exc

    async def _fetch_gemini(self, image: bytes, mime_type: str, crop: str) -> dict[str, Any]:
        prompt = (
            "You are CropGuardian AI, an agricultural decision-support assistant. "
            "Analyze the supplied crop leaf image for the requested crop. Return only JSON "
            "with exactly these fields: crop, scientificName, disease, pathogen, confidence, "
            "severity, symptomsSummary. Severity must be High, Medium, Low, or Healthy. "
            "Confidence must be a number from 0 to 100. Do not provide pesticide dosage. "
            f"Requested crop: {crop}."
        )
        payload = {
            "contents": [{
                "parts": [
                    {"text": prompt},
                    {
                        "inline_data": {
                            "mime_type": mime_type,
                            "data": base64.b64encode(image).decode("ascii"),
                        }
                    },
                ]
            }],
            "generationConfig": {
                "responseMimeType": "application/json",
                "temperature": 0.2,
            },
        }
        url = (
            "https://generativelanguage.googleapis.com/v1beta/models/"
            f"{self.settings.gemini_model}:generateContent"
        )

        async with httpx.AsyncClient(timeout=45) as client:
            response = await client.post(
                url,
                params={"key": self.settings.gemini_api_key},
                json=payload,
            )
            response.raise_for_status()
            return response.json()

    @staticmethod
    def _parse_provider_response(provider_data: dict[str, Any]) -> AIResult:
        text = provider_data["candidates"][0]["content"]["parts"][0]["text"]
        parsed = json.loads(text.strip().removeprefix("```json").removesuffix("```").strip())
        return AIResult.model_validate({
            **parsed,
            "mode": "ai",
            "timestamp": datetime.now(timezone.utc),
        })
