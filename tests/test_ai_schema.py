from datetime import datetime, timezone

import pytest
from pydantic import ValidationError

from backend.schemas.ai import AIResult


def valid_result() -> dict[str, object]:
    return {
        "crop": "Tomato",
        "scientificName": "Solanum lycopersicum",
        "disease": "Early Blight",
        "pathogen": "Alternaria solani",
        "confidence": 92,
        "severity": "High",
        "symptomsSummary": "Dark lesions with concentric rings were detected on the leaf.",
        "mode": "ai",
        "timestamp": datetime.now(timezone.utc),
    }


def test_ai_result_accepts_contract() -> None:
    result = AIResult.model_validate(valid_result())
    assert result.confidence == 92
    assert result.mode == "ai"


@pytest.mark.parametrize("field,value", [("confidence", 101), ("severity", "Critical"), ("mode", "live")])
def test_ai_result_rejects_invalid_values(field: str, value: object) -> None:
    payload = valid_result()
    payload[field] = value
    with pytest.raises(ValidationError):
        AIResult.model_validate(payload)


def test_ai_result_rejects_extra_fields() -> None:
    payload = valid_result()
    payload["unexpected"] = "value"
    with pytest.raises(ValidationError):
        AIResult.model_validate(payload)
