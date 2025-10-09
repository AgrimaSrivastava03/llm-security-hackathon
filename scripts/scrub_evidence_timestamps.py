#!/usr/bin/env python3
"""
Scrub timestamp-related fields from evidence JSON files and optionally
minimize entries to core fields only (query/input, action/message, reason/evidence).
"""

import json
import os
from typing import Any, Dict, List

EVIDENCE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "evidence")


TIMESTAMP_KEYS = {
    "timestamp",
    "time",
    "created_at",
    "updated_at",
    "run_id",
}


def remove_timestamp_fields(obj: Any) -> Any:
    if isinstance(obj, dict):
        return {k: remove_timestamp_fields(v) for k, v in obj.items() if k not in TIMESTAMP_KEYS}
    if isinstance(obj, list):
        return [remove_timestamp_fields(v) for v in obj]
    return obj


def reduce_to_core_fields(data: Dict[str, Any]) -> Dict[str, Any]:
    """Reduce entries to core fields only (query/input, action/message, reason/evidence)."""
    core: Dict[str, Any] = {}

    # Pass through top-level meta that isn't time-based but keep it minimal
    for key in list(data.keys()):
        if key.lower() in {"meta", "summary", "target", "target_type"}:
            # Remove timestamp-like fields inside
            core[key] = remove_timestamp_fields(data[key])

    # Transform results if present
    results = data.get("results")
    if isinstance(results, list):
        simplified: List[Dict[str, Any]] = []
        for r in results:
            entry: Dict[str, Any] = {}
            # Map likely query field names
            if isinstance(r, dict):
                if "input" in r:
                    entry["query"] = r.get("input")
                elif "query" in r:
                    entry["query"] = r.get("query")

                # Action/message
                if "message" in r:
                    entry["action"] = r.get("message")
                elif "status" in r and "ruleId" in r:
                    entry["action"] = f"{r.get('status')} ({r.get('ruleId')})"
                else:
                    entry["action"] = r.get("status", "")

                # Reason/evidence
                reason = None
                ev = r.get("evidence")
                if isinstance(ev, dict):
                    reason = ev.get("outputSnippet") or ev.get("reason") or ev.get("leak_type")
                if not reason:
                    reason = r.get("output") or r.get("answer")
                if reason:
                    entry["reason"] = reason

                # Keep severity/findings minimal if present
                if "severity" in r:
                    entry["severity"] = r["severity"]
                if "ruleId" in r:
                    entry["ruleId"] = r["ruleId"]

                simplified.append(entry)
        core["results"] = simplified

    return core if core else remove_timestamp_fields(data)


def process_file(path: str, minimize: bool) -> None:
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception:
        return

    cleaned = reduce_to_core_fields(data) if minimize else remove_timestamp_fields(data)

    with open(path, "w", encoding="utf-8") as f:
        json.dump(cleaned, f, indent=2, ensure_ascii=False)


def main() -> None:
    minimize = os.environ.get("SCRUB_MINIMIZE", "0").lower() in {"1", "true", "yes"}
    if not os.path.isdir(EVIDENCE_DIR):
        return
    for name in os.listdir(EVIDENCE_DIR):
        if not name.endswith(".json"):
            continue
        process_file(os.path.join(EVIDENCE_DIR, name), minimize)


if __name__ == "__main__":
    main()


