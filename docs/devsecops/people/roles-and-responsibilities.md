# Roles & Responsibilities

## Overview

Defines accountable ownership for security-aligned activities across the engineering organization.

## Role Definitions

| Role | Primary Focus | Key Security Responsibilities | Metrics Influenced |
|------|---------------|------------------------------|--------------------|
| Software Engineer | Feature delivery | Secure coding, secrets hygiene, threat model participation, fix findings | Vuln density, MTTR |
| Security Champion | Squad enablement | Relay guidance, triage findings, evangelize guardrails | Adoption %, rework reduction |
| Engineering Manager | Delivery & quality | Allocate time for remediation, ensure training completion | MTTR, training completion |
| DevSecOps / Security Engineer | Guardrails & automation | Tool selection, pipeline integration, policy-as-code, risk analytics | Pipeline coverage, false positives |
| Platform Engineer | Infrastructure enablement | Embed runtime and build controls, supply chain tooling | Control uptime, drift rate |
| Compliance Analyst | Evidence & mapping | Control catalog, map to frameworks (TBD), manage exceptions | Audit pass rate |
| Incident Commander | Incident coordination | Lead security incident response lifecycle | MTTR, containment time |

## Activity Matrix (Sample)

| Activity | Engineer | Champion | Security Eng | Platform Eng | Compliance |
|----------|----------|----------|-------------|--------------|-----------|
| Implement SAST fix | R | C | C | I | I |
| Add new scanner | I | C | A/R | R | I |
| Threat model session | R | C | A (method) | I | I |
| Secrets rotation | R | C | C | A/R | I |
| Policy update | I | C | A | R | C |
| Exception approval | I | I | C | C | A/R |

## Escalation Paths

1. Critical vulnerability with exploit path → Engineering Manager + Security Engineer within 24h.
2. Secret exposure (prod credential) → Immediate paging of Incident Commander.
3. Build pipeline compromise suspicion → Isolate runners, invoke IR playbook.

## Training Expectations

| Audience | Baseline | Annual | Advanced (Champions) |
|----------|----------|-------|----------------------|
| All Engineers | Secure coding (OWASP Top 10) | Refresher + new threat trends | Deep dive labs (supply chain, IaC, runtime) |
| Champions | Baseline + tool mastery | Scenario tabletop | Red/blue simulations |

## Review Cycle

Roles reviewed semi-annually or when org structure materially changes.
