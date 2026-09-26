import json
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status

from backend.database import get_connection
from backend.schemas.auth import (
    AuthUser,
    ChatTurn,
    ChatTurnCreate,
    CropAnalysis,
    ProfileUpdate,
)
from backend.security import AuthenticatedUser, get_current_user, require_csrf


router = APIRouter(prefix="/api/user", tags=["user data"])
MAX_CHAT_TURNS = 100
MAX_CROP_ANALYSES = 25


@router.get("/chat-history", response_model=list[ChatTurn])
def get_chat_history(
    user: AuthenticatedUser = Depends(get_current_user),
) -> list[ChatTurn]:
    connection = get_connection()
    try:
        rows = connection.execute(
            "SELECT question, response_json, created_at FROM chat_turns "
            "WHERE user_id = ? ORDER BY id DESC LIMIT ?",
            (user.id, MAX_CHAT_TURNS),
        ).fetchall()
        turns = []
        for row in reversed(rows):
            turns.append(ChatTurn(
                question=row["question"],
                response=json.loads(row["response_json"]),
                createdAt=row["created_at"],
            ))
        return turns
    finally:
        connection.close()


@router.post("/chat-history", status_code=status.HTTP_201_CREATED)
def save_chat_turn(
    payload: ChatTurnCreate,
    user: AuthenticatedUser = Depends(require_csrf),
) -> dict[str, str]:
    response_json = payload.response.model_dump_json(by_alias=True)
    if len(response_json) > 16000:
        raise HTTPException(status_code=413, detail="This assistant response is too large to save.")
    connection = get_connection()
    try:
        with connection:
            connection.execute(
                "INSERT INTO chat_turns (user_id, question, response_json, created_at) VALUES (?, ?, ?, ?)",
                (
                    user.id,
                    payload.question,
                    response_json,
                    datetime.now(timezone.utc).isoformat(),
                ),
            )
            connection.execute(
                "DELETE FROM chat_turns WHERE user_id = ? AND id NOT IN "
                "(SELECT id FROM chat_turns WHERE user_id = ? ORDER BY id DESC LIMIT ?)",
                (user.id, user.id, MAX_CHAT_TURNS),
            )
    finally:
        connection.close()
    return {"status": "saved"}


@router.delete("/chat-history")
def clear_chat_history(
    user: AuthenticatedUser = Depends(require_csrf),
) -> dict[str, str]:
    connection = get_connection()
    try:
        with connection:
            connection.execute("DELETE FROM chat_turns WHERE user_id = ?", (user.id,))
    finally:
        connection.close()
    return {"status": "cleared"}


@router.get("/analyses", response_model=list[CropAnalysis])
def get_analyses(
    user: AuthenticatedUser = Depends(get_current_user),
) -> list[CropAnalysis]:
    connection = get_connection()
    try:
        rows = connection.execute(
            "SELECT id, snapshot_json FROM crop_analyses "
            "WHERE user_id = ? ORDER BY id DESC LIMIT ?",
            (user.id, MAX_CROP_ANALYSES),
        ).fetchall()
        return [
            CropAnalysis.model_validate({**json.loads(row["snapshot_json"]), "id": row["id"]})
            for row in rows
        ]
    finally:
        connection.close()


@router.post("/analyses", response_model=CropAnalysis, status_code=status.HTTP_201_CREATED)
def save_analysis(
    payload: CropAnalysis,
    user: AuthenticatedUser = Depends(require_csrf),
) -> CropAnalysis:
    snapshot = payload.model_dump(exclude={"id"}, exclude_none=True)
    snapshot_json = json.dumps(snapshot, ensure_ascii=False, separators=(",", ":"))
    if len(snapshot_json) > 12000:
        raise HTTPException(status_code=413, detail="This crop analysis is too large to save.")
    connection = get_connection()
    try:
        with connection:
            cursor = connection.execute(
                "INSERT INTO crop_analyses (user_id, snapshot_json, created_at) VALUES (?, ?, ?)",
                (user.id, snapshot_json, datetime.now(timezone.utc).isoformat()),
            )
            analysis_id = int(cursor.lastrowid)
            connection.execute(
                "DELETE FROM crop_analyses WHERE user_id = ? AND id NOT IN "
                "(SELECT id FROM crop_analyses WHERE user_id = ? ORDER BY id DESC LIMIT ?)",
                (user.id, user.id, MAX_CROP_ANALYSES),
            )
        return payload.model_copy(update={"id": analysis_id})
    finally:
        connection.close()


@router.delete("/analyses/{analysis_id}")
def delete_analysis(
    analysis_id: int,
    user: AuthenticatedUser = Depends(require_csrf),
) -> dict[str, str]:
    connection = get_connection()
    try:
        with connection:
            cursor = connection.execute(
                "DELETE FROM crop_analyses WHERE id = ? AND user_id = ?",
                (analysis_id, user.id),
            )
    finally:
        connection.close()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Saved crop analysis not found.")
    return {"status": "deleted"}


@router.patch("/profile", response_model=AuthUser)
def update_profile(
    payload: ProfileUpdate,
    user: AuthenticatedUser = Depends(require_csrf),
) -> AuthUser:
    connection = get_connection()
    try:
        with connection:
            connection.execute(
                "UPDATE users SET preferred_language = ? WHERE id = ?",
                (payload.preferredLanguage, user.id),
            )
    finally:
        connection.close()
    return AuthUser(
        id=user.id,
        name=user.name,
        email=user.email,
        preferredLanguage=payload.preferredLanguage,
        csrfToken=user.csrf_token,
    )