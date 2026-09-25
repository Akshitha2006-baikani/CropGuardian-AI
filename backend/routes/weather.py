from fastapi import APIRouter, Query

from backend.config import get_settings
from backend.schemas.weather import WeatherData, WeatherUnavailable
from backend.services.weather_service import WeatherService

router = APIRouter(prefix="/api", tags=["weather"])


@router.get("/weather", response_model=WeatherData | WeatherUnavailable)
async def weather(location: str = Query("")) -> WeatherData | WeatherUnavailable:
    return await WeatherService(get_settings()).get_weather(location)
