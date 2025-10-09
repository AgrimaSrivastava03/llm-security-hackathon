# Data Classification (v1)

- Public: docs, marketing materials.
- Internal: build logs, non‑customer analytics.
- Confidential: customer policies, reports without PII.
- Restricted: prompts/responses that may contain PII/secrets; evidence DB rows.

## Handling
- Encrypt at rest and in transit; access via RBAC; audit logging.
- Restricted data retention defaults: 90 days (configurable per tenant).
