# Architecture Decision Record (ADR) Template

Status: Proposed | Accepted | Deprecated | Superseded by ADR-XYZ
Date: YYYY-MM-DD
Decision ID: ADR-XXX (sequential or date-based)
Version: 1.0
Related Artifacts: Pattern Matrix Version `MATRIX_VERSION_HASH`, Jira Epics, SLO Docs

## Context

- Business drivers (e.g., reduce lead time, enable region expansion, compliance requirement)
- Current pain metrics (cycle time, MTTR, error budget burn, cost/unit)
- Constraints (team size, time, regulatory, data residency, latency SLO)
- Alternatives considered (list briefly)

## Decision

Short, imperative statement of chosen option.

## Rationale

- Why selected vs alternatives (explicit trade-off analysis)
- Key assumptions & risk acceptance points
- Alignment to strategy / OKRs / architecture principles

## Option Comparison

| Option | Pros | Cons | Risks | Confidence |
| ------ | ---- | ---- | ----- | ---------- |
| Option A | | | | |
| Option B | | | | |
| Option C | | | | |

## Impact

| Area | Impact |
| ---- | ------ |
| DevEx | |
| Operability (SLOs) | |
| Security / Compliance | |
| Cost | |
| Time to Implement | |
| Cognitive Load | |

## Fitness Functions & KPIs

| Metric | Baseline | Target | Measurement Window |
| ------ | -------- | ------ | ------------------ |
| Deployment Frequency | | | |
| Lead Time for Change | | | |
| Error Budget Burn | | | |
| MTTR | | | |
| Cost / Transaction | | | |

## Implementation Plan

1. Phased rollout steps (with feature flags / canaries)
2. Required platform/tooling changes
3. Data migration strategy (if any)
4. Security & compliance tasks
5. Observability / dashboard updates

## Risks & Mitigations

| Risk | Mitigation | Owner | Review Date |
| ---- | ---------- | ----- | ----------- |
| | | | |

## Open Questions

- TBD list

## Decision Owner & Review

Owner: <Name/Role>
Review Cadence: e.g., 6 months or on triggering metrics (regression, cost spike)
Supersession Criteria: Specific KPI regression threshold or strategy pivot

## Appendices

- Links to spike results / POCs
- Pattern selection matrix snapshot (attach or reference commit hash)
- Cost model spreadsheet link

---
Return to [Architecture Overview](../README.md)
