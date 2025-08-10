# Internal Developer Platform

## Intent

Provide paved roads and abstractions enabling fast, consistent delivery with reduced cognitive load.

## Core Components

| Component | Purpose | Notes |
|-----------|---------|-------|
| Scaffolder | Bootstrap service with golden path | Template versioning |
| Golden Pipeline | Standard CI/CD stages | Extensible hooks |
| Runtime Platform | Orchestration (TBD) | K8s/ECS/AKS decision pending |
| Observability Stack | Unified metrics/logs/traces | OpenTelemetry baseline |
| Secrets Service | Central retrieval & rotation | Vault / Cloud native TBD |
| Policy Engine | Admission / IaC policy | OPA / Kyverno |
| Contract Testing Hub | Consumer/provider coordination | Pact broker candidate |

## Golden Path Criteria

- Includes build, test, security, architecture fitness gates
- Auto-instrumented observability
- SBOM + signing integrated
- Deployment strategy scaffold (canary/blue-green optional)

## Developer Experience KPIs

- Service scaffold time
- Lead time to first production deploy
- % services on golden path
- MTTR for failed deploy rollback

## Extensibility Model

Layered composition: base pipeline → language pack → service custom steps.

## Governance

Changes via PR + platform review; semantic version tags for template evolution.
