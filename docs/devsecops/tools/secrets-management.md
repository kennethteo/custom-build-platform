# Secrets Management

## Objectives

Eliminate hardcoded secrets, enforce least privilege, enable rapid rotation.

## Core Principles

1. No secrets in source control (enforced via pre-commit + CI scanning).
2. Central vault for storage; apps retrieve at runtime (solution TBD).
3. Prefer dynamic, short-lived credentials over static.
4. Rotate High sensitivity secrets every ≤90 days (target ≤30 for critical paths).

## Secret Classes

| Class | Examples | Rotation | Storage |
|-------|----------|----------|---------|
| Application Runtime | DB passwords, API tokens | 30–90 days | Vault / Secrets Manager |
| CI/CD | Signing keys, deploy tokens | 30–60 days | Vault + restricted workspace |
| Cloud Access | IAM user keys (avoid) | Move to roles | Vault (temporary) |
| Encryption Keys | KMS material | Per policy | KMS / HSM |

## Lifecycle

1. Request (ticket/automation)
2. Provision (vault API)
3. Distribute (injection via env/sidecar/secrets store CSI)
4. Rotate (automated scheduler)
5. Revoke (on incident/user departure)

## Patterns

- Kubernetes: Use CSI Secrets Store + IAM roles (if K8s chosen).
- Serverless: Native provider secrets integration.
- Local Dev: Developer sandbox tokens with limited scope & TTL.

## Scanning & Enforcement

- Pre-commit hook (gitleaks) required.
- CI fails on High confidence leak.
- Automated PR to purge & rotate exposed secret.

## Metrics

- Exposed secrets per month (should trend ↓)
- Mean rotation interval
- % secrets dynamic

## Pending Decisions

- Chosen vault technology
- Dynamic credential pattern (database, cloud)
