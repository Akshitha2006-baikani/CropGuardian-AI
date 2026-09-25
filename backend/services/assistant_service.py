import json
from typing import Any

import httpx
from pydantic import ValidationError

from backend.config import Settings
from backend.schemas.assistant import AssistantRequest, AssistantResponse


class AssistantServiceError(Exception):
    """Raised when the configured assistant provider is unavailable or invalid."""


LANGUAGE_NAMES = {"en": "English", "te": "Telugu", "hi": "Hindi"}


class AssistantService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    async def answer(self, request: AssistantRequest) -> AssistantResponse:
        if not self.settings.gemini_api_key:
            return self._fallback(request)

        try:
            payload = await self._fetch_gemini(request)
            return self._parse_provider_response(payload)
        except (httpx.HTTPError, httpx.TimeoutException) as exc:
            raise AssistantServiceError("The AI assistant is temporarily unavailable.") from exc
        except (KeyError, IndexError, TypeError, ValueError, ValidationError) as exc:
            raise AssistantServiceError("The AI assistant returned an invalid response.") from exc

    async def _fetch_gemini(self, request: AssistantRequest) -> dict[str, Any]:
        prompt = self._build_prompt(request)
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {"responseMimeType": "application/json", "temperature": 0.2},
        }
        url = (
            "https://generativelanguage.googleapis.com/v1beta/models/"
            f"{self.settings.gemini_model}:generateContent"
        )
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(url, params={"key": self.settings.gemini_api_key}, json=payload)
            response.raise_for_status()
            return response.json()

    @staticmethod
    def _build_prompt(request: AssistantRequest) -> str:
        language = LANGUAGE_NAMES[request.language]
        context = request.context.model_dump(exclude_none=True)
        return (
            "You are a cautious agricultural information assistant for CropGuardian AI. "
            f"Answer the farmer in {language} only. Do not claim to be a certified agronomist. "
            "Use only the supplied context and general conservative guidance. Never invent "
            "pesticide dosage, chemical concentration, application frequency, guaranteed cures, "
            "yield predictions, or unsupported facts. If uncertain, advise consulting a local "
            "agriculture expert or extension officer and following product labels/local guidance. "
            "Return only JSON with exactly these fields: answer (string), actions (array of strings), "
            "warnings (array of strings), followUp (string). "
            f"Farmer question: {request.clean_question}. Context: {json.dumps(context, ensure_ascii=False)}"
        )

    @staticmethod
    def _parse_provider_response(payload: dict[str, Any]) -> AssistantResponse:
        text = payload["candidates"][0]["content"]["parts"][0]["text"]
        parsed = json.loads(text.strip().removeprefix("```json").removesuffix("```").strip())
        return AssistantResponse.model_validate({**parsed, "mode": "AI"})

    @staticmethod
    def _fallback(request: AssistantRequest) -> AssistantResponse:
        context = request.context
        crop = context.crop or "your crop"
        disease = context.disease or "the reported symptoms"
        language = request.language
        if language == "te":
            answer = "AI సహాయకుడు అందుబాటులో లేదు. ఇది మీ పంటలో కనిపించిన లక్షణాల కోసం సాధారణ మార్గదర్శకం మాత్రమే."
            actions = ["ప్రభావిత ఆకులను పరిశీలించండి.", "తేమ మరియు వర్ష పరిస్థితులను గమనించండి.", "అనిశ్చితి ఉంటే స్థానిక వ్యవసాయ నిపుణుడిని సంప్రదించండి."]
            follow_up = "తర్వాత ఎప్పుడు స్కాన్ చేయాలో తెలుసుకోవాలనుకుంటున్నారా?"
            warning = "ఇది సాధారణ మార్గదర్శకం మాత్రమే. స్థానిక వ్యవసాయ సలహా మరియు ఉత్పత్తి లేబుల్‌ను అనుసరించండి."
        elif language == "hi":
            answer = "AI सहायक उपलब्ध नहीं है। यह आपकी फसल में दिखने वाले लक्षणों के लिए सामान्य मार्गदर्शन है।"
            actions = ["प्रभावित पत्तियों का निरीक्षण करें।", "नमी और बारिश की स्थिति पर नजर रखें।", "अनिश्चितता होने पर स्थानीय कृषि विशेषज्ञ से संपर्क करें।"]
            follow_up = "क्या आप जानना चाहते हैं कि दोबारा स्कैन कब करें?"
            warning = "यह केवल सामान्य मार्गदर्शन है। स्थानीय कृषि सलाह और उत्पाद लेबल का पालन करें।"
        else:
            answer = f"The AI assistant is unavailable. This is general guidance for {disease} on {crop}, not a diagnosis."
            actions = ["Inspect visibly affected leaves.", "Monitor moisture and rain conditions.", "Consult a local agriculture expert if uncertain."]
            follow_up = "Would you like general guidance on when to scan again?"
            warning = "Deterministic guidance only. Follow local agricultural guidance and product labels."
        return AssistantResponse(
            answer=answer,
            actions=actions,
            warnings=[warning],
            followUp=follow_up,
            mode="FALLBACK",
        )
