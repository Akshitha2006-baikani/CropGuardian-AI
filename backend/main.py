from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import get_settings
from backend.database import initialize_database
from backend.routes.analyze import router as analyze_router
from backend.routes.auth import router as auth_router
from backend.routes.assistant import router as assistant_router
from backend.routes.health import router as health_router
from backend.routes.risk import router as risk_router
from backend.routes.user import router as user_router
from backend.routes.weather import router as weather_router

settings = get_settings()


@asynccontextmanager
async def lifespan(_: FastAPI):
    initialize_database()
    yield


app = FastAPI(title="CropGuardian AI API", version="1.0.0", lifespan=lifespan)
allowed_origins = [origin.strip() for origin in settings.frontend_origin.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins or ["*"],
    allow_credentials=allowed_origins != ["*"],
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*", "X-CSRF-Token"],
)
app.include_router(health_router)
app.include_router(analyze_router)
app.include_router(assistant_router)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(weather_router)
app.include_router(risk_router)
