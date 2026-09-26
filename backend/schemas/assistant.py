from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

from backend.schemas.weather import WeatherData


AssistantLanguage = Literal["en", "te", "hi"]
AssistantMode = Literal["AI"]


class AssistantContext(BaseModel):
    model_config = ConfigDict(extra="forbid")

    crop: str | None = None
    disease: str | None = None
    severity: str | None = None
    confidence: float | None = Field(default=None, ge=0, le=100)
    symptomsSummary: str | None = None
    riskScore: int | None = Field(default=None, ge=0, le=100)
    riskReasons: list[str] = Field(default_factory=list)
    weather: WeatherData | None = None
    location: str | None = None


class AssistantRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    question: str = Field(min_length=1, max_length=1000)
    language: AssistantLanguage
    context: AssistantContext = Field(default_factory=AssistantContext)

    @field_validator("question")
    @classmethod
    def reject_blank_question(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("question must not be blank")
        return value.strip()

    @property
    def clean_question(self) -> str:
        return self.question.strip()


class AssistantResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    answer: str = Field(min_length=1)
    actions: list[str] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)
    followUp: str
    mode: AssistantMode

    @field_validator("answer", "followUp")
    @classmethod
    def validate_text(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("text must not be blank")
        return value.strip()
