# Operating Model

## Purpose

Define how security responsibilities are distributed and executed across squads, platform teams, and central security.

## Guiding Tenets

1. Central team builds guardrails, not gates (unless risk justifies).
2. Product squads own remediation and preventive quality.
3. Automation > Manual review wherever feasible.
4. Risk transparency over control opacity.

## Organizational Layers

| Layer | Scope | Primary Responsibilities | Success Indicators |
|-------|-------|--------------------------|-------------------|
| Security Enablement | Patterns, tooling, policy-as-code | Provide golden pipelines, training, threat modeling support | Adoption %, lead time reduction |
| Platform / DevEx | CI/CD, runtime platform (K8s/ECS/VM/AppService TBD) | Embed scanners, supply chain controls, secrets integration | Pipeline reliability, scan SLAs |
| Product Squads | Features & services | Implement secure code, fix vulns, model threats, define SLOs | Vuln MTTR, escaped defect rate |
| Governance & Risk | Compliance & audit mapping | Control catalog, evidence automation, exception workflow | Audit pass rate, time-to-evidence |

NOTE: Runtime/orchestration platform still to be confirmed (see placeholder TBD items).

## RACI Snapshot (Abbreviated)

| Activity | Squad | Security | Platform | Compliance |
|----------|-------|----------|----------|-----------|
| Secure Coding | R | C | C | I |
| SAST/SCA Tooling | C | A | R | I |
| Dependency Upgrades | R | C | C | I |
| Secret Rotation | C | A | R | I |
| Threat Modeling | R | A (method) | C | I |
| Incident Response (App) | R | A (coordination) | C | C |
| Policy-as-Code Updates | C | A | R | I |
| Audit Evidence Collection | C | C | R (automation) | A |

Legend: R = Responsible, A = Accountable, C = Consulted, I = Informed.

## Security Champions Program

- Each squad nominates 1 champion (~10–20% allocation).
- Champions receive advanced training, early tool previews.
- Quarterly objectives: reduce top recurring misconfig pattern, improve false-positive ratio, drive adoption of new guardrail.

## Operating Rhythms

| Cadence | Ceremony | Goal | Participants |
|---------|----------|------|-------------|
| Weekly | Risk Triage Sync | Prioritize new findings, unblock remediation | Security, Platform, Reps |
| Bi-weekly | Champion Guild | Share patterns, metrics, backlog | Champions, Security |
| Monthly | Metrics Review | Review KPIs, adjust thresholds | Sec Leadership, Eng Leads |
| Quarterly | Threat Landscape Refresh | Update abuse cases & mitigations | Security, Architecture |

## Decision Guardrails

| Area | Guardrail | Rationale |
|------|----------|-----------|
| Build Fail Policy | Break on Critical/High (CVSS ≥7.0) unless approved exception | Focus on impactful risk |
| Secret Storage | All long-lived secrets in central vault (solution TBD) | Prevent sprawl & leakage |
| Artifact Integrity | All release artifacts must be signed (sigstore/cosign planned) | Supply chain trust |
| IaC Changes | Must pass policy-as-code (OPA/Tfsec) | Prevent misconfig drift |
| Data Egress | Must use approved egress pathways | Prevent exfiltration & shadow APIs |

## Interfaces & Handoffs

| Interface | Trigger | Artifact | SLA |
|----------|--------|---------|-----|
| Threat Modeling Assist | New high-risk architecture | Threat model report | 3 biz days scheduling |
| Exception Request | Build break w/ business urgency | YAML exception file | 2 biz days decision |
| Incident Declared | P1/P2 security event | IR case ticket | Immediate engagement |
| Audit Evidence | Quarterly audit cycle | Evidence export bundle | 5 biz days turnaround |

## KPIs (Team-Level)

- % Squads with active Champion
- Avg days to remediate High severity
- % Pipelines on golden template
- False positive ratio (scanner-specific)
- Policy-as-code coverage (% IaC repos)

## Open Placeholders

- Orchestration Platform: TBD (Kubernetes / ECS / AKS / Lambda / App Service?)
- Vault / Secrets Solution: TBD
- Compliance Frameworks: TBD (see compliance elaboration document once defined)

Update this document as soon as TBD items are clarified.
