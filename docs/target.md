# Day 1 Target Selection

## Target: Sample RAG + Tool-Use App
- Endpoint: http://localhost:9000/query (planned for local demo)
- Capabilities: Retrieval over small corpus, simple web-fetch tool, math tool
- Models: Local stub or hosted small model for demo repeatability

## Rationale
- RAG and agents are the most commonly exploited surfaces for LLM01–LLM04 issues.
- Keeps demo deterministic and auditable.

## Scope & Assumptions
- Non-production data; synthetic corpus only.
- No PII in source documents; any detected PII indicates guardrail failure.

## Risks (aligned to OWASP LLM Top-10)
- LLM01 Prompt Injection (direct/indirect)
- LLM02 Data Leakage
- LLM03 Supply Chain (unsafe params/tools)
- LLM04 Model Autonomy / Tool Abuse

## Acceptance for Day 1
- Target described and fixed; seeds reference this endpoint.
- Policies defined for CI thresholding.
