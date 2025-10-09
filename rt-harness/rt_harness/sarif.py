import json
from typing import List, Dict, Any


def write_sarif(results: List[Dict[str, Any]], out_path: str) -> None:
    sarif = {
        "version": "2.1.0",
        "runs": [
            {
                "tool": {"driver": {"name": "rt-harness", "version": "0.1.0"}},
                "results": [
                    {
                        "ruleId": r.get("ruleId"),
                        "level": "error" if r.get("status") == "fail" else "note",
                        "message": {"text": r.get("message", "")},
                        "properties": {
                            "severity": r.get("severity"),
                            "seedId": r.get("seedId"),
                            "latencyMs": r.get("latencyMs"),
                            "evidence": r.get("evidence"),
                        },
                    }
                    for r in results
                ],
            }
        ],
    }
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(sarif, f, ensure_ascii=False, indent=2)


def read_findings(path: str) -> List[Dict[str, Any]]:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if "runs" in data:  # SARIF
        return [
            {
                "ruleId": item.get("ruleId"),
                "status": "fail" if item.get("level") == "error" else "pass",
                "severity": (item.get("properties", {}) or {}).get("severity"),
            }
            for item in data.get("runs", [{}])[0].get("results", [])
        ]
    return data.get("results", [])
