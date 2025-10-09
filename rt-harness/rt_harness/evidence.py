import os
import sqlite3
from typing import Optional, Dict, Any, List

SCHEMA = """
CREATE TABLE IF NOT EXISTS runs (
  run_id INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at TEXT NOT NULL,
  target TEXT NOT NULL,
  policy_version TEXT
);
CREATE TABLE IF NOT EXISTS findings (
  finding_id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id INTEGER NOT NULL,
  rule_id TEXT NOT NULL,
  seed_id TEXT,
  severity TEXT,
  status TEXT,
  message TEXT,
  latency_ms INTEGER,
  input_hash TEXT,
  output_hash TEXT,
  FOREIGN KEY(run_id) REFERENCES runs(run_id)
);
"""


def _connect(db_path: str) -> sqlite3.Connection:
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA journal_mode=WAL;")
    conn.execute("PRAGMA foreign_keys=ON;")
    return conn


def init_db(db_path: str) -> None:
    with _connect(db_path) as conn:
        conn.executescript(SCHEMA)


def insert_run(db_path: str, started_at: str, target: str, policy_version: Optional[str]) -> int:
    with _connect(db_path) as conn:
        cur = conn.execute(
            "INSERT INTO runs(started_at, target, policy_version) VALUES(?,?,?)",
            (started_at, target, policy_version),
        )
        conn.commit()
        return int(cur.lastrowid)


def insert_findings(db_path: str, run_id: int, findings: List[Dict[str, Any]]) -> None:
    rows = [
        (
            run_id,
            f.get("ruleId"),
            f.get("seedId"),
            f.get("severity"),
            f.get("status"),
            f.get("message"),
            f.get("latencyMs"),
            f.get("inputHash"),
            f.get("outputHash"),
        )
        for f in findings
    ]
    with _connect(db_path) as conn:
        conn.executemany(
            """
            INSERT INTO findings(
              run_id, rule_id, seed_id, severity, status, message, latency_ms, input_hash, output_hash
            ) VALUES (?,?,?,?,?,?,?,?,?)
            """,
            rows,
        )
        conn.commit()
