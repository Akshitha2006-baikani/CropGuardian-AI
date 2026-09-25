from datetime import datetime

from pydantic import BaseModel


class WeatherUnavailable(BaseModel):
    available: bool = False
    message: str


class WeatherData(BaseModel):
    available: bool = True
    location: str
    temperature: float | None = None
    humidity: float | None = None
    rainProbability: float | None = None
    rainfall: float | None = None
    windSpeed: float | None = None
    condition: str | None = None
    timestamp: datetime
