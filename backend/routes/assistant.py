from fastapi import APIRouter, HTTPException, status

from backend.config import get_settings
from backend.schemas.ai import ErrorResponse
from backend.schemas.assistant import AssistantRequest, AssistantResponse
from backend.services.assistant_service import AssistantService, AssistantServiceError

router = APIRouter(prefix="/api", tags=["assistant"])


@router.post(
    "/assistant",
    response_model=AssistantResponse,
    responses={502: {"model": ErrorResponse}, 422: {"model": ErrorResponse}},
)
async def assistant(request: AssistantRequest) -> AssistantResponse:
    try:
        return await AssistantService(get_settings()).answer(request)
    except AssistantServiceError as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc
