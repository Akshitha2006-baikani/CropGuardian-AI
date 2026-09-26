import asyncio
import json
from typing import Any

import httpx
from pydantic import ValidationError

from backend.config import Settings
from backend.schemas.assistant import AssistantRequest, AssistantResponse


class AssistantServiceError(Exception):
    """Raised when the configured assistant provider is unavailable or invalid."""


LANGUAGE_NAMES = {
    "en": "English",
    "te": "Telugu",
    "hi": "Hindi",
}


class AssistantService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    async def answer(self, request: AssistantRequest) -> AssistantResponse:
        if not self.settings.gemini_api_key:
            raise AssistantServiceError(
                "Gemini is not configured on this server. Set GEMINI_API_KEY on the API service."
            )

        try:
            payload = await self._fetch_gemini(request)
            return self._parse_provider_response(payload)

        except AssistantServiceError:
            raise

        except httpx.TimeoutException as exc:
            raise AssistantServiceError(
                "The AI assistant timed out. Please try again."
            ) from exc

        except httpx.HTTPError as exc:
            raise AssistantServiceError(
                "The AI assistant is temporarily unavailable. Please try again."
            ) from exc

        except (
            AttributeError,
            KeyError,
            IndexError,
            TypeError,
            ValueError,
            ValidationError,
        ) as exc:
            raise AssistantServiceError(
                "The AI assistant returned an invalid response."
            ) from exc

    async def _fetch_gemini(
        self,
        request: AssistantRequest,
    ) -> dict[str, Any]:
        prompt = self._build_prompt(request)

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt,
                        }
                    ]
                }
            ],
            "generationConfig": {
                "responseMimeType": "application/json",
            },
        }

        models = list(dict.fromkeys((
            self.settings.gemini_model.strip(),
            "gemini-3.5-flash-lite",
        )))

        last_error: Exception | None = None
        model_configuration_error = False

        for model in models:
            if not model:
                continue
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"

            for attempt in range(2):
                try:
                    async with httpx.AsyncClient(
                        timeout=httpx.Timeout(20.0, connect=8.0)
                    ) as client:
                        response = await client.post(
                            url,
                            params={
                                "key": self.settings.gemini_api_key,
                            },
                            json=payload,
                        )

                    if response.status_code in {401, 403}:
                        raise AssistantServiceError(
                            "Gemini rejected the configured API key or permissions. "
                            "Check GEMINI_API_KEY and its Gemini API access."
                        )

                    if response.status_code == 429 or response.status_code >= 500:
                        last_error = httpx.HTTPStatusError(
                            f"Gemini returned HTTP {response.status_code}",
                            request=response.request,
                            response=response,
                        )
                        if attempt == 0:
                            await asyncio.sleep(1)
                            continue
                        break

                    if response.status_code in {400, 404}:
                        try:
                            provider_message = str(
                                response.json().get("error", {}).get("message", "")
                            ).lower()
                        except (AttributeError, ValueError):
                            provider_message = ""
                        if response.status_code == 404 or any(
                            marker in provider_message
                            for marker in ("model", "not found", "unsupported")
                        ):
                            model_configuration_error = True
                            last_error = httpx.HTTPStatusError(
                                f"Gemini rejected model {model}",
                                request=response.request,
                                response=response,
                            )
                            break
                        if "api key" in provider_message or "permission" in provider_message:
                            raise AssistantServiceError(
                                "Gemini rejected the configured API key or permissions. "
                                "Check GEMINI_API_KEY and its Gemini API access."
                            )
                        raise AssistantServiceError(
                            "Gemini rejected the request. Check GEMINI_MODEL and the request configuration."
                        )

                    if response.is_error:
                        raise AssistantServiceError(
                            f"Gemini rejected the request (HTTP {response.status_code})."
                        )

                    return response.json()

                except httpx.TimeoutException as exc:
                    last_error = exc
                    if attempt == 0:
                        await asyncio.sleep(1)
                        continue
                    break
                except httpx.HTTPError as exc:
                    last_error = exc
                    if attempt == 0:
                        await asyncio.sleep(1)
                        continue
                    break

        if (
            isinstance(last_error, httpx.HTTPStatusError)
            and last_error.response.status_code == 429
        ):
            raise AssistantServiceError(
                "Gemini's usage limit was reached. Wait briefly or check the API project's quota and billing."
            ) from last_error

        if model_configuration_error:
            raise AssistantServiceError(
                "No configured Gemini model is available. Set GEMINI_MODEL to a supported model."
            ) from last_error

        raise AssistantServiceError(
            "The AI assistant is temporarily unavailable. Please try again shortly."
        ) from last_error

    @staticmethod
    def _build_prompt(request: AssistantRequest) -> str:
        language = LANGUAGE_NAMES[request.language]
        context = request.context.model_dump(exclude_none=True)

        return (
            "You are CropGuardian AI, a cautious agricultural information assistant. "
            f"Answer the farmer in {language} only, using clear and practical language. "
            "Help with crop diseases and visible symptoms, possible pests and detection, "
            "irrigation and drainage, soil health and fertilizer decisions, weather risks, "
            "preventive measures, and crop selection or rotation. Use supplied context "
            "when relevant; do not invent local conditions, diagnoses, or missing facts. "
            "State uncertainty and ask for useful details when the question lacks context. "
            "Do not claim to be a certified agronomist. Never invent pesticide dosage, "
            "chemical concentration, application frequency, guaranteed cures, or yield "
            "predictions. Recommend local agriculture experts or extension officers for "
            "uncertain or high-risk cases, and always defer to product labels and local "
            "guidance. Return only JSON with exactly these fields: answer (string), "
            "actions (array of strings), warnings (array of strings), followUp (string). "
            f"Farmer question: {request.clean_question}. "
            f"Context: {json.dumps(context, ensure_ascii=False)}"
        )
    @staticmethod
    def _parse_provider_response(
        payload: dict[str, Any],
    ) -> AssistantResponse:
        candidates = payload.get("candidates") or []
        if not candidates:
            raise ValueError("Gemini returned no candidates")
        parts = candidates[0].get("content", {}).get("parts", [])
        text = next(
            (part["text"] for part in parts if isinstance(part.get("text"), str)),
            "",
        )
        if not text.strip():
            raise ValueError("Gemini returned no text")

        cleaned_text = (
            text.strip()
            .removeprefix("```json")
            .removesuffix("```")
            .strip()
        )
        parsed = json.loads(cleaned_text)

        return AssistantResponse.model_validate(
            {
                **parsed,
                "mode": "AI",
            }
        )


__all__ = ["AssistantService", "AssistantServiceError"]

