from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

from backend.schemas.assistant import AssistantResponse


Language = Literal["en", "te", "hi"]


class SignupRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(min_length=10, max_length=72)

    @field_validator("name")
    @classmethod
    def normalize_name(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("name must not be blank")
        return cleaned

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: EmailStr) -> str:
        return str(value).strip().lower()

    @field_validator("password")
    @classmethod
    def limit_bcrypt_password_bytes(cls, value: str) -> str:
        if len(value.encode("utf-8")) > 72:
            raise ValueError("password must be at most 72 UTF-8 bytes")
        return value


class LoginRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    email: EmailStr
    password: str = Field(min_length=1, max_length=72)
    rememberMe: bool = False

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: EmailStr) -> str:
        return str(value).strip().lower()


class AuthUser(BaseModel):
    id: int
    name: str
    email: EmailStr
    preferredLanguage: Language
    csrfToken: str


class ProfileUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    preferredLanguage: Language


class ChatTurnCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    question: str = Field(min_length=1, max_length=1000)
    response: AssistantResponse

    @field_validator("question")
    @classmethod
    def normalize_question(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("question must not be blank")
        return cleaned


class ChatTurn(BaseModel):
    question: str
    response: AssistantResponse
    createdAt: str


class CropAnalysis(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: int | None = None
    crop: str = Field(min_length=1, max_length=100)
    disease: str = Field(min_length=1, max_length=160)
    confidence: float = Field(ge=0, le=100)
    severity: str = Field(min_length=1, max_length=40)
    riskScore: int = Field(ge=0, le=100)
    riskLevel: str = Field(min_length=1, max_length=40)
    mode: Literal["ai", "demo", "unknown"]
    date: str | None = Field(default=None, max_length=40)
    time: str | None = Field(default=None, max_length=40)
    recommendation: str | None = Field(default=None, max_length=500)
    scientificName: str | None = Field(default=None, max_length=120)
    pathogen: str | None = Field(default=None, max_length=160)
    symptomsSummary: str | None = Field(default=None, max_length=1000)
    riskReasons: list[str] = Field(default_factory=list, max_length=20)
    weatherFactors: list[Any] = Field(default_factory=list, max_length=20)