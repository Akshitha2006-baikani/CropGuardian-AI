from functools import lru_cache
import os

from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()


class Settings(BaseModel):
    gemini_api_key: str | None = None
    gemini_model: str = "gemini-1.5-flash"
    weather_api_key: str | None = None
    weather_provider: str = "weatherapi"
    high_humidity_threshold: float = 80
    rain_probability_threshold: float = 60
    weather_risk_points: int = 5
    database_url: str = "sqlite:///./cropguardian.db"
    auth_secret: str | None = None
    frontend_origin: str = "http://localhost:8000,http://127.0.0.1:8000"
    max_upload_bytes: int = 10 * 1024 * 1024


@lru_cache
def get_settings() -> Settings:
    return Settings(
        gemini_api_key=os.getenv("GEMINI_API_KEY") or None,
        gemini_model=os.getenv("GEMINI_MODEL", "gemini-1.5-flash"),
        weather_api_key=os.getenv("WEATHER_API_KEY") or None,
        weather_provider=os.getenv("WEATHER_PROVIDER", "weatherapi").lower(),
        high_humidity_threshold=float(os.getenv("HIGH_HUMIDITY_THRESHOLD", 80)),
        rain_probability_threshold=float(os.getenv("RAIN_PROBABILITY_THRESHOLD", 60)),
        weather_risk_points=int(os.getenv("WEATHER_RISK_POINTS", 5)),
        database_url=os.getenv("DATABASE_URL", "sqlite:///./cropguardian.db"),
        auth_secret=os.getenv("AUTH_SECRET") or None,
        frontend_origin=os.getenv("FRONTEND_ORIGIN", "http://localhost:8000,http://127.0.0.1:8000"),
        max_upload_bytes=int(os.getenv("MAX_UPLOAD_BYTES", 10 * 1024 * 1024)),
    )
