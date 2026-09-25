from typing import Literal

from backend.config import Settings
from backend.schemas.weather import WeatherData


RiskLevel = Literal["Healthy", "Moderate", "High"]


def calculate_risk(
    confidence: float,
    severity: str,
    weather: WeatherData | None = None,
    disease: str | None = None,
    settings: Settings | None = None,
) -> dict[str, object]:
    if settings is None:
        from backend.config import get_settings
        settings = get_settings()

    severity_scores = {"Healthy": 8, "Low": 28, "Medium": 54, "High": 82}
    base_score = severity_scores.get(severity, 50)
    score = round(base_score * 0.7 + base_score * 0.3 * (confidence / 100))
    weather_factors = []
    weather_reasons = []
    if weather and weather.available and severity != "Healthy":
        if weather.humidity is not None and weather.humidity >= settings.high_humidity_threshold:
            score += settings.weather_risk_points
            weather_factors.append({"factor": "humidity", "value": weather.humidity, "effect": "elevated"})
            weather_reasons.append("Current humidity may favor fungal disease development")
        if weather.rainProbability is not None and weather.rainProbability >= settings.rain_probability_threshold:
            score += settings.weather_risk_points
            weather_factors.append({"factor": "rain probability", "value": weather.rainProbability, "effect": "elevated"})
            weather_reasons.append("Rain is expected soon; check local conditions before foliar treatments")
        if weather.rainfall is not None and weather.rainfall > 0:
            weather_factors.append({"factor": "rainfall", "value": weather.rainfall, "effect": "elevated"})

    score = max(0, min(100, score))
    if score <= 30:
        level: RiskLevel = "Healthy"
    elif score <= 60:
        level = "Moderate"
    else:
        level = "High"

    reasons = []
    if severity == "High":
        reasons.append("High disease severity")
    elif severity == "Medium":
        reasons.append("Moderate disease severity")
    elif severity == "Healthy":
        reasons.append("No active disease severity reported")
    if confidence >= 80:
        reasons.append("High AI confidence")
    elif confidence < 50:
        reasons.append("Low AI confidence")

    return {
        "riskScore": score,
        "riskLevel": level,
        "reasons": reasons + weather_reasons,
        "weatherFactors": weather_factors,
    }
