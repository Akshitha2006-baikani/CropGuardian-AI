from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

from backend.schemas.weather import WeatherData


class RiskRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    confidence: float = Field(ge=0, le=100)
    severity: Literal["High", "Medium", "Low", "Healthy"]
    disease: str | None = None
    weather: WeatherData | None = None


class WeatherFactor(BaseModel):
    factor: str
    value: float
    effect: Literal["elevated", "neutral"]


class RiskAssessment(BaseModel):
    riskScore: int = Field(ge=0, le=100)
    riskLevel: Literal["Healthy", "Moderate", "High"]
    reasons: list[str]
    weatherFactors: list[WeatherFactor] = Field(default_factory=list)
