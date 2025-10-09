# Threat Model (v1)

## Assets
- Customer prompts/responses; policies; evidence DB; logs; reports.

## Trust Boundaries
- Frontend ↔ Sidecar ↔ Upstream model/tools; CI runners; storage buckets; DB.

## Key Threats
- Prompt Injection / Indirect Injection
- Data Leakage (PII/secrets/system prompts)
- Tool Abuse / Excessive Agency
- Supply Chain (deps, containers, CI)
- Authentication/Authorization bypass

## Controls
- Sidecar guardrails (deny/challenge, PII redaction, allowlists)
- Policy‑as‑code + CI thresholds
- TLS/mTLS, secrets mgmt, least‑privilege IAM
- SBOM/signing, scans, provenance
- Observability: logs/metrics/traces, alerts
