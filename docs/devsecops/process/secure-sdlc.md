# Secure SDLC

## Purpose

Embed security controls natively into the delivery workflow for Java, .NET, and Node.js services.

## Phase Controls

| Phase | Activities | Mandatory Controls | Tooling (Example) | Exit Criteria |
|-------|-----------|--------------------|-------------------|---------------|
| Plan | Threat modeling (risk-based), abuse case enumeration | High-risk epics have threat model | Modeling toolkit, template | Model merged & reviewed |
| Code | Secure coding, secrets scanning pre-commit | SAST, secrets hooks | IDE plugins, pre-commit hooks | No critical/high open |
| Build | Dependency, license, container scan, SBOM creation | SCA, license policy, SBOM | SCA tool, syft | Signed SBOM stored |
| Test | DAST/API fuzzing (risk-based), IaC scan | DAST gating (critical only) | DAST tool, fuzz harness | Zero critical DAST findings |
| Release | Artifact signing, provenance attestations | Sigstore/cosign (planned) | cosign, OPA policy | Signed & policy pass |
| Deploy | Admission policy, runtime config validation | Policy-as-code (OPA/Kyverno) | OPA, admission controller | Policy evaluation = pass |
| Operate | Monitoring, anomaly detection, log integrity | Centralized structured logging | SIEM, eBPF | SLOs met |
| Improve | Post-incident / vuln RCA, metrics review | RCA template usage | Knowledge base | Action items tracked |

## Gating Policy (Initial)

- Break build: Critical/High (CVSS ≥ 7.0) SAST, SCA, Container, IaC findings without approved exception.
- Warn only: Medium for ≤30 days then escalate.
- Track only: Low & informational for trend analytics.

## Threat Modeling Lightweight Flow

1. Identify high-risk changes (new external interface, sensitive data, auth model change).
2. Use template (STRIDE-based or misuse case).
3. Review with Security Engineer (async comments).
4. Derive controls & test cases; link to user stories.

## Supply Chain Security (Planned)

- SBOM generation every build.
- Artifact signing using cosign + provenance (SLSA level target TBD).
- Dependency update bot PR cadence: weekly.

## Evidence Automation

All control outputs (scan JSON, SBOM, attestations) stored in centralized evidence bucket with retention ≥ 1 year.

## TBD / Inputs Needed

- Orchestration platform to finalise runtime policies.
- Compliance frameworks to map control IDs.
