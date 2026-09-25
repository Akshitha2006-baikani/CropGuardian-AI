from fastapi import APIRouter

from backend.config import get_settings
from backend.schemas.risk import RiskAssessment, RiskRequest
from backend.services.risk_service import calculate_risk

router = APIRouter(prefix="/api", tags=["risk"])


@router.post("/risk", response_model=RiskAssessment)
async def risk(request: RiskRequest) -> RiskAssessment:
    return RiskAssessment.model_validate(calculate_risk(
        request.confidence,
        request.severity,
        request.weather,
        request.disease,
        get_settings(),
    ))
