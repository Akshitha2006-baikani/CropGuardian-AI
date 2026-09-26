import sqlite3
from pathlib import Path
from threading import RLock

from backend.config import get_settings


_SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL CHECK(length(name) BETWEEN 1 AND 100),
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    preferred_language TEXT NOT NULL DEFAULT 'en'
        CHECK(preferred_language IN ('en', 'te', 'hi')),
    created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS chat_turns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question TEXT NOT NULL CHECK(length(question) BETWEEN 1 AND 1000),
    response_json TEXT NOT NULL,
    created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_chat_turns_user_id_id
    ON chat_turns(user_id, id);
CREATE TABLE IF NOT EXISTS crop_analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    snapshot_json TEXT NOT NULL,
    created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_crop_analyses_user_id_id
    ON crop_analyses(user_id, id DESC);
"""
_INITIALIZED_PATHS: set[str] = set()
_INITIALIZATION_LOCK = RLock()


def _resolve_path(database_url: str) -> Path:
    prefix = "sqlite:///"
    if not database_url.startswith(prefix):
        raise RuntimeError("Only SQLite DATABASE_URL values are supported.")

    raw_path = database_url[len(prefix):]
    if not raw_path or raw_path == ":memory:":
        raise RuntimeError("DATABASE_URL must point to a persistent SQLite file.")

    path = Path(raw_path).expanduser()
    if not path.is_absolute():
        path = Path.cwd() / path
    path.parent.mkdir(parents=True, exist_ok=True)
    return path.resolve()


def _open(path: Path) -> sqlite3.Connection:
    connection = sqlite3.connect(str(path), timeout=10)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    connection.execute("PRAGMA busy_timeout = 10000")
    return connection


def get_connection(database_url: str | None = None) -> sqlite3.Connection:
    path = _resolve_path(database_url or get_settings().database_url)
    path_key = str(path)
    with _INITIALIZATION_LOCK:
        if path_key not in _INITIALIZED_PATHS:
            connection = _open(path)
            try:
                connection.executescript(_SCHEMA)
                connection.execute("PRAGMA journal_mode = WAL")
                connection.commit()
            finally:
                connection.close()
            _INITIALIZED_PATHS.add(path_key)
    return _open(path)


def initialize_database() -> None:
    connection = get_connection()
    connection.close()