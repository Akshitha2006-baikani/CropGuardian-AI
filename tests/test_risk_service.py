from datetime import datetime, timezone

from backend.schemas.weather import WeatherData
from backend.services.risk_service import calculate_risk


def test_high_confidence_high_severity_is_high_risk() -> None:
    result = calculate_risk(94, "High")
    assert result["riskScore"] == 81
    assert result["riskLevel"] == "High"
    assert "High disease severity" in result["reasons"]


def test_healthy_result_is_low_risk() -> None:
    result = calculate_risk(98, "Healthy")
    assert result["riskScore"] == 8
    assert result["riskLevel"] == "Healthy"


def test_weather_factors_add_transparent_heuristic_risk() -> None:
    weather = WeatherData(
        location="Hyderabad",
        temperature=29,
        humidity=85,
        rainProbability=70,
        rainfall=4.2,
        windSpeed=12,
        condition="Partly cloudy",
        timestamp=datetime.now(timezone.utc),
    )
    result = calculate_risk(94, "High", weather)
    assert result["riskScore"] == 91
    assert "Current humidity may favor fungal disease development" in result["reasons"]
    assert len(result["weatherFactors"]) == 3
