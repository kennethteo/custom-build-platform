# DevSecOps Overview

## Purpose
This section defines how we embed security as a first-class concern across the software delivery lifecycle (SDLC) using a holistic People, Process, Tools (PPT) model. It establishes a shared language, decision guardrails, and measurable outcomes so teams can deliver secure, reliable, compliant software at speed.

## Scope

- All product engineering squads (application, data, platform, infrastructure)
- All environments (local → production)
- All delivery artifacts (source code, IaC, containers, ML models, data pipelines)

## Core Principles

1. Shift Security Left & Right: Prevent early, detect continuously, respond fast.
2. Security as Code: Policies, controls, tests, configurations are versioned and automated.
3. Least Privilege by Default: Access minimised, deliberately escalated, visibly audited.
4. Continuous Risk Reduction: Focus on risk burn-down, not checklist completion.
5. Transparency & Observability: Security signals are first-class telemetry.
6. Shared Responsibility with Clear Ownership: Everyone participates; ambiguity removed.
7. Blameless Learning Loops: Incidents and near-misses feed systemic improvement.

## Strategic Objectives (12–18 month horizon)

| Objective | Target Outcome | Primary Metrics |
|-----------|----------------|-----------------|
| Reduce Mean-Time-To-Remediate (MTTR) critical vulns | < 7 days | MTTR (Critical/High) |
| Embed automated gating in CI | 95% pipelines with SAST/Dependency/Secrets scans | Pipeline coverage % |
| Improve secure coding maturity | 90% devs complete secure training | Training completion, vuln density |
| Policy-as-Code adoption | 100% IaC repos with guardrails | % repos w/ OPA/Tfsec checks |
| SBOM provenance & integrity | 100% builds produce signed SBOM | % builds w/ attestations |

## Operating Model

We structure DevSecOps enablement around three planes:

1. Enablement Plane: Frameworks, reusable templates, golden paths, education.
2. Control Plane: Policy-as-code, identity and secrets management, gating, compliance evidence.
3. Execution Plane: Product squads owning security outcomes in their backlog with guardrails.

Refer to: `people/operating-model.md` for RACI & interaction patterns.

## Maturity Model (Simplified)

| Dimension | Level 1 (Ad-hoc) | Level 2 (Defined) | Level 3 (Automated) | Level 4 (Optimised) |
|----------|------------------|-------------------|---------------------|---------------------|
| Code Security | Manual reviews | SAST in CI | Coverage + gating | Risk-based tuning |
| Dependencies | Sporadic scans | Scheduled scans | Continuous + SBOM | Real-time intel feed |
| IaC | Manual checks | Static linting | Policy-as-code gating | Drift prevention & auto-fix |
| Runtime | Reactive logs | Basic alerts | Unified telemetry + anomaly detection | Predictive & response automation |
| Secrets | In repo incidents | Central vault | Enforced + scanning | Dynamic short-lived creds |
| Incident Response | Tribal knowledge | Runbooks | Tabletop & automation | Continuous chaos & resilience |

## Value Streams & Integration Points

| SDLC Stage | Security Activities | Tooling Examples | KPIs |
|------------|--------------------|------------------|------|
| Plan | Threat modeling, risk triage | Threat modeling toolkit | % epics w/ model |
| Code | Secure coding, secrets scan | SAST, secret scanners | Vuln density |
| Build | Dependency & license scan, SBOM | SCA, SBOM generator | % builds w/ SBOM |
| Test | DAST, API fuzzing, IaC scan | DAST, fuzzing, policy-as-code | False positive rate |
| Release | Signing, provenance, supply chain controls | Sigstore/cosign | % signed artifacts |
| Deploy | Runtime config validation, drift detection | Admission controllers, OPA | Blocked non-compliant deploys |
| Operate | Monitoring, WAF, anomaly detection | SIEM, EDR, eBPF | MTTD/MTTR |
| Improve | Post-incident review, metrics | Dashboards, knowledge base | Closure SLA |

## Metrics & Scorecards

Key metric classes:

- Exposure: Open critical vulns > X days, attack surface inventory coverage.
- Flow: Security findings per KLOC, rework %, pipeline pass rate.
- Quality: False positive ratio, mean risk score trend.
- Resilience: MTTD, MTTR, incident containment time.
- Adoption: % services on golden path, training completion, % policy-as-code coverage.

Scorecards are auto-generated monthly from pipeline + scanning systems; manual overrides discouraged.

## Governance Model

- Lightweight Architecture & Security Review only for net-new patterns or elevated risk.
- Risk Acceptance: Time-bound, with defined compensating controls, reviewed quarterly.
- Exceptions tracked in a single repository with YAML metadata and auto-expiry.
- Security Champions network per squad (see `people/roles-and-responsibilities.md`).

## Automation Strategy

1. Detect early: Pre-commit hooks, IDE plugins.
2. Gate pragmatically: Fail fast on critical/high; warn on medium with timeboxed backlog.
3. Orchestrate: Unified pipeline template ("golden pipeline") with pluggable stages.
4. Consolidate signals: Normalise into shared risk index.
5. Automate fixes: PR bots for dependency bumps, policy remediation suggestions.

## Toolchain Summary

See `tools/toolchain-map.md` and `tools/security-automation-pipeline.md` for detailed inventory, ownership, SLAs, data flows, and integration diagrams.

## Risk Management Flow

1. Identify (scans, threat modeling, asset inventory)
2. Triage (risk scoring, deduplication, assignment)
3. Treat (fix, mitigate, accept, defer)
4. Track (dashboards, SLOs)
5. Learn (root cause, systemic improvement)

## Embedding & Adoption

- Golden Path: Starter repos + pipeline templates embed mandatory controls.
- Champion Enablement: Monthly guild sessions, office hours, curated backlog of improvements.
- Feedback Loops: Quarterly developer survey, scan friction index, false-positive audits.

## Roadmap Snapshot

| Quarter | Initiative | Outcome |
|---------|------------|---------|
| Q1 | Unified SBOM + signing | Provenance baseline |
| Q2 | Policy-as-code expansion (K8s, Terraform) | Reduced misconfig drift |
| Q3 | Automated threat modeling assist | Faster design reviews |
| Q4 | Runtime anomaly ML + auto quarantine | Reduced MTTD |

## Related Documents

- People: `people/operating-model.md`, `people/skills-matrix.md`
- Process: `process/secure-sdlc.md`, `process/incident-response.md`
- Tools: `tools/toolchain-map.md`, `tools/secrets-management.md`

## Contribution Guidelines

Changes follow: propose (PR) → security review (if control impact) → merge → version bump of meta-index.

---
Next: populate sub-documents with org-specific details.

## Open Questions (to finalise tailoring)

Please provide or confirm:

1. Primary programming languages & frameworks (e.g., Node.js, Go, Java, Python?).
2. Deployment targets & orchestration (Kubernetes? Serverless? Hybrid?).
3. Cloud providers / on-prem mix.
4. Compliance or regulatory drivers (ISO 27001, SOC 2, PCI, HIPAA, GDPR, others?).
5. Existing security tooling already licensed (e.g., Snyk, Prisma, Tenable, Aqua, SonarQube, Vault, Splunk, Datadog).
6. Incident response maturity (have runbooks, on-call, paging? yes/no details).
7. Appetite for build-breaker gates vs. warning-only (risk tolerance statement).
8. Current artifact signing or supply chain controls in place?
9. Central secrets management solution in production? Which?
10. Desired metric frequency & executive reporting format (dashboard, PDF, OKR tie-in?).

Respond and I will tailor the sub-documents accordingly.

