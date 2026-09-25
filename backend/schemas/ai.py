from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator


Severity = Literal["High", "Medium", "Low", "Healthy"]
AnalysisMode = Literal["ai", "demo"]


class AIResult(BaseModel):
    model_config = ConfigDict(extra="forbid")

    crop: str = Field(min_length=1)
    scientificName: str
    disease: str = Field(min_length=1)
    pathogen: str | None = None
    confidence: float = Field(ge=0, le=100)
    severity: Severity
    symptomsSummary: str
    mode: AnalysisMode
    timestamp: datetime

    @field_validator("crop", "disease", "symptomsSummary", "scientificName")
    @classmethod
    def reject_blank_text(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("must not be blank")
        return value.strip()


class ErrorResponse(BaseModel):
    error: str
    detail: str
