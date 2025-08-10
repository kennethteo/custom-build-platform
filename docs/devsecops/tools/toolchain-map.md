# Toolchain Map

> Preliminary; pending confirmation of deployment platform & compliance frameworks.

## Categories & Candidates

| Category | Purpose | Current / Candidate | Owner | SLA/Notes |
|----------|---------|---------------------|-------|----------|
| SAST | Static code analysis (Java/.NET/Node) | TBD (e.g., SonarQube, Semgrep) | Security Eng | Breaks on High |
| SCA / Dependency | Vulnerable libs & licenses | TBD (e.g., Snyk, OWASP DepCheck) | Security Eng | SBOM export |
| Secrets Scanning | Prevent hardcoded secrets | TBD (e.g., Gitleaks) | Platform | Pre-commit & CI |
| Container Scan | Image vulnerabilities | Trivy / Grype (candidate) | Platform | Build & registry scan |
| IaC Scan | Terraform/K8s misconfig | tfsec / Checkov / OPA | Platform | Policy-as-code |
| Policy-as-Code | Enforce runtime & IaC policies | OPA / Kyverno | Platform | Admission control |
| SBOM & Signing | Supply chain integrity | syft + cosign | Platform | Attestations stored |
| DAST / API | Runtime app testing | TBD (e.g., OWASP ZAP, StackHawk) | Security Eng | High severity gate |
| Fuzzing | API/Protocol robustness | TBD (e.g., OSS-Fuzz style) | Security Eng | Risk-based |
| Secrets Mgmt | Central secret storage | TBD (HashiCorp Vault / AWS Secrets Manager / Azure Key Vault) | Platform | Rotation policy |
| SIEM | Central log analytics | TBD | SecOps | Detection coverage |
| Alerting & Paging | Incident notification | TBD (PagerDuty / OpsGenie) | SecOps | 24/7 P1 |
| Metrics & Dashboards | Security KPIs | TBD (Grafana / Datadog) | Security Eng | Monthly board deck |
| Ticketing | Workflow & tracking | Jira / ServiceNow | EM / SecOps | SLA automation |

## Integration Flow (Conceptual)

Code → CI (SAST/SCA/Secrets) → Build (SBOM, Container Scan) → Policy Gate (IaC, Signing) → Deploy (Admission Control) → Runtime Telemetry (SIEM, Metrics) → Risk Dashboard.

## Data Retention

| Artifact | Retention | Storage |
|---------|-----------|--------|
| Scan Reports | 12 months | Central object storage |
| SBOMs | 24 months | Evidence bucket |
| Signing Attestations | 24 months | Evidence bucket |
| Logs (Security events) | 13 months (GDPR min TBD) | SIEM hot/cold tiers |

## Ownership Principles

- Single accountable owner per category.
- Backup owner documented.
- Quarterly review of tool efficacy & overlap.

## TBD

- Confirm chosen tools where multiple candidates listed.
- Integrate cost tracking.
