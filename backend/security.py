from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
import hmac
import secrets

import bcrypt
import jwt
from fastapi import Depends, Header, HTTPException, Request, Response, status

from backend.config import get_settings
from backend.database import get_connection


ISSUER = "cropguardian-ai"


@dataclass(frozen=True)
class AuthenticatedUser:
    id: int
    name: str
    email: str
    preferred_language: str
    csrf_token: str


def _auth_secret() -> str:
    secret = get_settings().auth_secret
    if not secret or len(secret.encode("utf-8")) < 32:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication is not configured. Set a 32-character AUTH_SECRET on the API service.",
        )
    return secret


def ensure_auth_configured() -> None:
    _auth_secret()


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt(rounds=12)).decode("ascii")


def verify_password(password: str, password_hash: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode("utf-8"), password_hash.encode("ascii"))
    except (UnicodeEncodeError, ValueError):
        return False


def new_csrf_token() -> str:
    return secrets.token_urlsafe(32)


def create_access_token(user_id: int, csrf_token: str, remember_me: bool) -> str:
    settings = get_settings()
    lifetime = (
        timedelta(days=settings.auth_remember_days)
        if remember_me
        else timedelta(hours=settings.auth_token_hours)
    )
    now = datetime.now(timezone.utc)
    return jwt.encode(
        {
            "sub": str(user_id),
            "csrf": csrf_token,
            "iss": ISSUER,
            "iat": now,
            "exp": now + lifetime,
        },
        _auth_secret(),
        algorithm="HS256",
    )


def set_auth_cookie(response: Response, token: str, remember_me: bool) -> None:
    settings = get_settings()
    same_site = settings.auth_cookie_samesite.lower()
    if same_site not in {"lax", "strict", "none"}:
        raise RuntimeError("AUTH_COOKIE_SAMESITE must be Lax, Strict, or None.")
    max_age = None
    if remember_me:
        max_age = settings.auth_remember_days * 24 * 60 * 60
    response.set_cookie(
        key=settings.auth_cookie_name,
        value=token,
        max_age=max_age,
        httponly=True,
        secure=settings.auth_cookie_secure or same_site == "none",
        samesite=same_site,
        path="/",
    )


def clear_auth_cookie(response: Response) -> None:
    settings = get_settings()
    same_site = settings.auth_cookie_samesite.lower()
    response.delete_cookie(
        key=settings.auth_cookie_name,
        path="/",
        httponly=True,
        secure=settings.auth_cookie_secure or same_site == "none",
        samesite=same_site,
    )


def validate_request_origin(request: Request) -> None:
    origin = request.headers.get("origin")
    if not origin:
        return
    allowed_origins = {
        value.strip()
        for value in get_settings().frontend_origin.split(",")
        if value.strip()
    }
    if origin not in allowed_origins:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This request origin is not allowed.",
        )


def get_optional_user(request: Request) -> AuthenticatedUser | None:
    settings = get_settings()
    token = request.cookies.get(settings.auth_cookie_name)
    if not token:
        return None
    try:
        claims = jwt.decode(
            token,
            _auth_secret(),
            algorithms=["HS256"],
            issuer=ISSUER,
            options={"require": ["sub", "csrf", "exp", "iat", "iss"]},
        )
        user_id = int(claims["sub"])
        csrf_token = claims["csrf"]
        if not isinstance(csrf_token, str):
            return None
    except (jwt.InvalidTokenError, KeyError, TypeError, ValueError):
        return None

    connection = get_connection()
    try:
        row = connection.execute(
            "SELECT id, name, email, preferred_language FROM users WHERE id = ?",
            (user_id,),
        ).fetchone()
    finally:
        connection.close()
    if row is None:
        return None
    return AuthenticatedUser(
        id=row["id"],
        name=row["name"],
        email=row["email"],
        preferred_language=row["preferred_language"],
        csrf_token=csrf_token,
    )


def get_current_user(
    current_user: AuthenticatedUser | None = Depends(get_optional_user),
) -> AuthenticatedUser:
    if current_user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sign in to access this feature.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return current_user


def require_csrf(
    request: Request,
    csrf_header: str | None = Header(default=None, alias="X-CSRF-Token"),
    current_user: AuthenticatedUser = Depends(get_current_user),
) -> AuthenticatedUser:
    validate_request_origin(request)
    if not csrf_header or not hmac.compare_digest(csrf_header, current_user.csrf_token):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The request security token is missing or invalid. Refresh your session and retry.",
        )
    return current_user