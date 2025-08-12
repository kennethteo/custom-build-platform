# Incident Response (Security)

## Objectives

Rapidly detect, contain, eradicate, and learn from security incidents with minimal impact.

## Severity Levels (Indicative)

| Sev | Description | Examples | Target MTTR |
|-----|-------------|----------|-------------|
| P1 | Active exploit, data exfiltration | Prod credential leak with abuse | < 4h |
| P2 | Potential compromise, service degradation | Suspicious lateral movement | < 12h |
| P3 | Contained issue, low impact | Single endpoint misuse | < 48h |
| P4 | Observed anomaly / false positive validation | Unusual log spike | < 5d |

## Lifecycle

1. Detect (alerts, anomaly detection, user reports)
2. Triage (validate, classify severity)
3. Contain (isolate services, revoke creds)
4. Eradicate (patch, remove malware, rotate secrets)
5. Recover (restore normal ops, monitor)
6. Lessons Learned (RCA, remediation backlog)

## Roles

- Incident Commander
- Communications Lead
- Forensic Analyst
- Engineering Liaison
- Legal / Compliance (as needed)

## Tooling (Candidate)

- SIEM / Log analytics: TBD (e.g., Splunk / Datadog / Elastic)
- Endpoint / Runtime: eBPF agent or CSPM
- Ticketing: Jira / ServiceNow

## Runbooks

Each P1/P2 category must have a runbook with: detection signature, isolation steps, escalation list, rollback steps, validation queries.

## Metrics

- MTTD (Mean Time To Detect)
- MTTR (Mean Time To Recover)
- Containment Time
- % Incidents with RCA completed in ≤5 biz days

## Continuous Improvement

- Monthly tabletop exercise
- Quarterly chaos-style security drill (token leak simulation)

## Open Items

- Finalize tooling selection per detection domain.
- Define on-call rotation and paging stack.
