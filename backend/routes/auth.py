import sqlite3
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status

from backend.database import get_connection
from backend.schemas.auth import AuthUser, LoginRequest, SignupRequest
from backend.security import (
    AuthenticatedUser,
    clear_auth_cookie,
    create_access_token,
    ensure_auth_configured,
    get_optional_user,
    hash_password,
    new_csrf_token,
    set_auth_cookie,
    validate_request_origin,
    verify_password,
)


router = APIRouter(prefix="/api/auth", tags=["authentication"])


def _response_user(user: AuthenticatedUser, csrf_token: str | None = None) -> AuthUser:
    return AuthUser(
        id=user.id,
        name=user.name,
        email=user.email,
        preferredLanguage=user.preferred_language,
        csrfToken=csrf_token or user.csrf_token,
    )


def _create_session(
    user_id: int,
    name: str,
    email: str,
    preferred_language: str,
    response: Response,
    remember_me: bool,
) -> AuthUser:
    csrf_token = new_csrf_token()
    access_token = create_access_token(user_id, csrf_token, remember_me)
    set_auth_cookie(response, access_token, remember_me)
    return AuthUser(
        id=user_id,
        name=name,
        email=email,
        preferredLanguage=preferred_language,
        csrfToken=csrf_token,
    )


@router.post("/signup", response_model=AuthUser, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest, request: Request, response: Response) -> AuthUser:
    validate_request_origin(request)
    ensure_auth_configured()
    connection = get_connection()
    try:
        with connection:
            cursor = connection.execute(
                "INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, ?)",
                (
                    payload.name,
                    str(payload.email),
                    hash_password(payload.password),
                    datetime.now(timezone.utc).isoformat(),
                ),
            )
            user_id = int(cursor.lastrowid)
    except sqlite3.IntegrityError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        ) from exc
    finally:
        connection.close()

    return _create_session(
        user_id,
        payload.name,
        str(payload.email),
        "en",
        response,
        remember_me=False,
    )


@router.post("/login", response_model=AuthUser)
def login(payload: LoginRequest, request: Request, response: Response) -> AuthUser:
    validate_request_origin(request)
    ensure_auth_configured()
    connection = get_connection()
    try:
        user = connection.execute(
            "SELECT id, name, email, password_hash, preferred_language FROM users WHERE email = ? COLLATE NOCASE",
            (str(payload.email),),
        ).fetchone()
    finally:
        connection.close()

    if user is None or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return _create_session(
        user["id"],
        user["name"],
        user["email"],
        user["preferred_language"],
        response,
        remember_me=payload.rememberMe,
    )


@router.get("/me", response_model=AuthUser | None)
def current_user(user: AuthenticatedUser | None = Depends(get_optional_user)) -> AuthUser | None:
    return _response_user(user) if user else None


@router.post("/logout")
def logout(request: Request, response: Response) -> dict[str, str]:
    validate_request_origin(request)
    clear_auth_cookie(response)
    return {"status": "logged_out"}