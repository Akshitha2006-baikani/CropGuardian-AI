import asyncio
from datetime import datetime, timezone

import httpx
import pytest

from backend.config import Settings
from backend.services.weather_service import WeatherService


def settings(**overrides: object) -> Settings:
    values = {"weather_api_key": "test-key", "weather_provider": "weatherapi"}
    values.update(overrides)
    return Settings(**values)


def provider_payload() -> dict[str, object]:
    return {
        "location": {"name": "Hyderabad"},
        "current": {
            "temp_c": 29,
            "humidity": 72,
            "precip_mm": 4.2,
            "wind_kph": 12,
            "condition": {"text": "Partly cloudy"},
            "last_updated": "2026-09-25 10:30",
        },
        "forecast": {"forecastday": [{"day": {"daily_chance_of_rain": 60}}]},
    }


def test_normalizes_weatherapi_response(monkeypatch: pytest.MonkeyPatch) -> None:
    service = WeatherService(settings())

    async def fake_fetch(location: str) -> dict[str, object]:
        return provider_payload()

    monkeypatch.setattr(service, "_fetch_weatherapi", fake_fetch)
    result = asyncio.run(service.get_weather("Hyderabad"))
    assert result.available is True
    assert result.temperature == 29
    assert result.rainProbability == 60
    assert result.timestamp == datetime(2026, 9, 25, 10, 30, tzinfo=timezone.utc)


def test_provider_error_returns_controlled_unavailable(monkeypatch: pytest.MonkeyPatch) -> None:
    service = WeatherService(settings())

    async def failed_fetch(location: str) -> dict[str, object]:
        raise httpx.ReadTimeout("timed out")

    monkeypatch.setattr(service, "_fetch_weatherapi", failed_fetch)
    result = asyncio.run(service.get_weather("Hyderabad"))
    assert result.available is False
    assert result.message == "Weather service is currently unavailable."


def test_malformed_provider_response_returns_controlled_unavailable(monkeypatch: pytest.MonkeyPatch) -> None:
    service = WeatherService(settings())

    async def malformed_fetch(location: str) -> dict[str, object]:
        return {"current": {"temp_c": 29}}

    monkeypatch.setattr(service, "_fetch_weatherapi", malformed_fetch)
    result = asyncio.run(service.get_weather("Hyderabad"))
    assert result.available is False
    assert result.message == "Weather data was unavailable or malformed."


def test_nullable_provider_fields_are_allowed(monkeypatch: pytest.MonkeyPatch) -> None:
    service = WeatherService(settings())
    payload = provider_payload()
    current = payload["current"]
    assert isinstance(current, dict)
    current.pop("precip_mm")
    current.pop("wind_kph")
    payload["forecast"]["forecastday"][0]["day"].pop("daily_chance_of_rain")

    async def partial_fetch(location: str) -> dict[str, object]:
        return payload

    monkeypatch.setattr(service, "_fetch_weatherapi", partial_fetch)
    result = asyncio.run(service.get_weather("Hyderabad"))
    assert result.available is True
    assert result.rainfall is None
    assert result.windSpeed is None
    assert result.rainProbability is None