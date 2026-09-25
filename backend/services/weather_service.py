from datetime import datetime, timezone
from typing import Any

import httpx
from pydantic import ValidationError

from backend.config import Settings
from backend.schemas.weather import WeatherData, WeatherUnavailable


class WeatherService:
    """WeatherAPI.com adapter with a provider-neutral application response."""

    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    async def get_weather(self, location: str) -> WeatherData | WeatherUnavailable:
        location = location.strip()
        if not location:
            return WeatherUnavailable(message="Add your farm location to view weather.")
        if not self.settings.weather_api_key:
            return WeatherUnavailable(message="Weather service is not configured.")
        if self.settings.weather_provider != "weatherapi":
            return WeatherUnavailable(message="Weather provider is not configured.")

        try:
            payload = await self._fetch_weatherapi(location)
            return self._normalize_weatherapi(payload, location)
        except (httpx.HTTPError, httpx.TimeoutException) as exc:
            print(f"WeatherAPI error: {type(exc).__name__}: {exc}")
            return WeatherUnavailable(message="Weather service is currently unavailable.")
        except (KeyError, TypeError, ValueError, ValidationError):
            return WeatherUnavailable(message="Weather data was unavailable or malformed.")

    async def _fetch_weatherapi(self, location: str) -> dict[str, Any]:
        url = "https://api.weatherapi.com/v1/forecast.json"
        params = {"key": self.settings.weather_api_key, "q": location, "days": 1, "aqi": "no", "alerts": "no"}
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response.json()

    @staticmethod
    def _normalize_weatherapi(payload: dict[str, Any], requested_location: str) -> WeatherData:
        current = payload["current"]
        forecast_day = payload["forecast"]["forecastday"][0]["day"]
        timestamp = datetime.fromisoformat(current["last_updated"].replace(" ", "T"))
        if timestamp.tzinfo is None:
            timestamp = timestamp.replace(tzinfo=timezone.utc)

        return WeatherData.model_validate({
            "available": True,
            "location": requested_location,
            "temperature": current.get("temp_c"),
            "humidity": current.get("humidity"),
            "rainProbability": forecast_day.get("daily_chance_of_rain"),
            "rainfall": current.get("precip_mm"),
            "windSpeed": current.get("wind_kph"),
            "condition": current.get("condition", {}).get("text"),
            "timestamp": timestamp,
        })
