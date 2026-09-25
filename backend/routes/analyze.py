from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status

from backend.config import get_settings
from backend.schemas.ai import AIResult, ErrorResponse
from backend.services.ai_service import AIService, AIServiceError

router = APIRouter(prefix="/api", tags=["analysis"])
SUPPORTED_CROPS = {"Tomato", "Rice (Paddy)", "Cotton", "Potato"}


@router.post(
    "/analyze",
    response_model=AIResult,
    responses={400: {"model": ErrorResponse}, 413: {"model": ErrorResponse}, 422: {"model": ErrorResponse}, 502: {"model": ErrorResponse}, 503: {"model": ErrorResponse}},
)
async def analyze(
    image: UploadFile = File(...),
    crop: str = Form(...),
    mode: str = Form("ai"),
) -> AIResult:
    settings = get_settings()
    if mode != "ai":
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Only AI analysis is available for uploaded images.")
    if crop not in SUPPORTED_CROPS:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="This crop is not supported for diagnosis.")
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Upload a valid image file.")
    allowed_extensions = {"image/jpeg": {".jpg", ".jpeg"}, "image/png": {".png"}, "image/webp": {".webp"}}
    extension = Path(image.filename or "").suffix.lower()
    if image.content_type not in allowed_extensions or extension not in allowed_extensions[image.content_type]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Upload a JPG, PNG, or WEBP image.")

    content = await image.read(settings.max_upload_bytes + 1)
    if len(content) > settings.max_upload_bytes:
        raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="Image exceeds the 10MB limit.")

    try:
        return await AIService(settings).analyze(content, image.content_type, crop)
    except AIServiceError as exc:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail=str(exc)) from exc
