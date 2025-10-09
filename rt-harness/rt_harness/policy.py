import yaml
from typing import Dict, Any, List, Tuple


def load_policy(path: str) -> Dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def evaluate_thresholds(findings: List[Dict[str, Any]], policy: Dict[str, Any]) -> Tuple[bool, str]:
    codes_to_fail = set((policy.get("thresholds", {}) or {}).get("fail_if_any", []) or [])
    max_sev = (policy.get("thresholds", {}) or {}).get("max_severity", "high")
    sev_rank = {"low": 1, "medium": 2, "high": 3}
    max_rank = sev_rank.get(max_sev, 3)

    violated = False
    messages: List[str] = []

    for f in findings:
        code = f.get("ruleId")
        status = f.get("status")
        sev = f.get("severity", "low")
        if status == "fail" and (code in codes_to_fail or sev_rank.get(sev, 1) >= max_rank):
            violated = True
            messages.append(f"FAIL: {code} severity={sev}")

    if violated:
        return True, "; ".join(messages) or "Policy thresholds violated"
    return False, "Policy thresholds satisfied"


def validate_policy(policy: Dict[str, Any]) -> List[str]:
    errors: List[str] = []
    if not isinstance(policy, dict):
        return ["Policy must be a mapping"]
    if "policies" not in policy or not isinstance(policy["policies"], list):
        errors.append("'policies' must be a list")
    if "thresholds" in policy and not isinstance(policy["thresholds"], dict):
        errors.append("'thresholds' must be a mapping if present")
    for i, p in enumerate(policy.get("policies", [])):
        if not isinstance(p, dict):
            errors.append(f"policy[{i}] must be a mapping")
            continue
        if not p.get("id"):
            errors.append(f"policy[{i}] missing id")
        if not p.get("action"):
            errors.append(f"policy[{i}] missing action")
        if not p.get("phase"):
            errors.append(f"policy[{i}] missing phase")
    return errors
