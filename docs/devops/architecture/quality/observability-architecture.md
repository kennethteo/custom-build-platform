# Observability Architecture

## Intent

Provide actionable, end-to-end visibility into system behavior (user → edge → service → data) enabling fast detection, triage, root cause analysis, and continuous improvement of reliability & performance.

## Pillars & Beyond

| Dimension | Purpose | Key Artifacts |
| --------- | ------- | ------------- |
| Metrics | Quantitative time-series for SLOs & capacity | RED/USE dashboards, SLO panels |
| Traces | Causal path reconstruction across components | Distributed trace spans |
| Logs | High-cardinality contextual forensic detail | Structured JSON events |
| Profiles | Runtime resource usage hotspots | CPU/Heap profiles |
| Events (Audits) | Security & config change lineage | Audit trails |

## Principles

- Product mindset: Observability features treated as first-class backlog items.
- Standardization: One telemetry schema (OpenTelemetry) and correlation ID propagation everywhere.
- Automate First: Default dashboards/alerts provisioned via code when a service is created.
- SLO-Centric: Instrumentation driven by user journeys & error budgets, not raw CPU graphs.
- Least Noise: Alert only on user-impact or exhaustion of error budget burn rate thresholds.

## Architecture Overview

1. Instrumentation libraries (OpenTelemetry) auto-included in service templates.  
2. Exporters send telemetry to collector agents (sidecar/daemonset).  
3. Central pipeline routes data → time-series DB, log storage, trace backend.  
4. Correlation keys: `trace_id`, `span_id`, `tenant_id`, `request_id` standardized.  
5. Query & visualization layer (dashboards, ad-hoc exploration).  
6. Alerting engine referencing SLO/error budget + anomaly detection.  
7. Continuous feedback loop: Post-incident reviews produce new or adjusted telemetry.

## Key Design Decisions

| Decision | Options | Guidance |
| -------- | ------- | -------- |
| Data Model | OTLP semantic conventions vs custom | Favor OTLP for portability |
| Sampling Strategy | Head (probabilistic), Tail, Adaptive | Start head 100% low volume; adapt tail for high QPS |
| Metrics Backend | Prometheus vs managed (AMP, Azure Monitor) | Use managed if multi-region scale & retention needs |
| Log Storage | Loki / Elastic / Cloud-native | Prefer cost optimized tiered storage |
| Trace Backend | Jaeger / Tempo / Cloud X-Ray | Align with metrics integration & sampling needs |
| Correlation Strategy | Trace & baggage headers | W3C Trace Context + minimal baggage keys |

## Fitness Functions

| Objective | Automated Check | Target |
| --------- | --------------- | ------ |
| Telemetry Coverage | % services emitting logs+metrics+traces | 100% prod services |
| SLO Definition | % tier-1 services with error & latency SLOs | 100% |
| Alert Quality | Alert:ticket ratio (actionable rate) | ≥ 80% actionable |
| MTTR | Mean time to recovery (last quarter) | Improving trend |
| Data Cardinality | High cardinality label limiter violations | 0 |

## Operational Considerations

### Metrics

- Standard base metrics: request count, error count, latency histograms, resource utilization.
- Histogram buckets aligned across services to enable aggregation.

### Tracing

- Enforce context propagation libraries (lint for missing instrumentation on HTTP clients).
- Tail sampling for hotspots (retain slow/error traces).

### Logging

- Structured keys: `timestamp`, `level`, `service`, `trace_id`, `span_id`, `request_id`, `tenant_id`.
- PII scrubbing middleware enforced at ingestion.

### Alerting

- Multi-window, multi-burn rate alerts for error budgets (e.g. 2% over 1h, 5% over 6h).
- Notification routing by ownership metadata (service catalog integration).

### Cost & Retention

- Tiered retention: traces (7d full, 30d sampled), logs (14d hot, 90d archive), metrics (13m high-res, 18m downsampled).
- Cardinality budget per service; CI check rejects over-budget label additions.

## Implementation Workflow

1. Service scaffolding adds auto-instrumentation & default dashboards.  
2. Developer adds domain span attributes & business metrics (counters, histograms).  
3. CI validation: instrumentation presence, metric naming conventions, no PII log fields.  
4. Deployment registers service metadata in catalog (owner, SLO links).  
5. Alert definitions created programmatically or refused deploy (gate) for tier-1.  
6. Weekly review: top noisy alerts & MTTR trends → improvement actions.

## Anti-Patterns

- Dashboard sprawl without ownership.
- High-cardinality metrics (user ID label) exploding storage.
- Log-only troubleshooting; ignoring traces & metrics.
- Paging on infrastructure metrics without user impact context.

## Tooling Alignment

| Concern | Java | .NET | Node.js |
| ------- | ---- | ---- | ------- |
| Instrumentation | OpenTelemetry Agent | OpenTelemetry .NET | OpenTelemetry Node SDK |
| Metrics | Micrometer (OTLP) | OpenTelemetry Metrics | prom-client (OTLP exporter) |
| Logging | SLF4J JSON encoder | Serilog JSON | pino / winston |
| Tracing | OpenTelemetry auto & manual spans | OpenTelemetry | OpenTelemetry |
| Validation | ArchUnit rules for instrumentation, custom CI scripts | Roslyn analyzers | ESLint custom rules |

## Checklist

- [ ] Service emits metrics (RED/USE) & traces
- [ ] Structured logs with correlation IDs
- [ ] SLOs defined & stored in catalog
- [ ] Error budget alerts configured
- [ ] Dashboards auto-provisioned & reviewed
- [ ] PII scrubbing validated
- [ ] Cardinality within budget
- [ ] Runbook includes telemetry queries

## References

- Google SRE Workbook (SLOs & Alerts)
- OpenTelemetry Specification
- RED / USE Monitoring Patterns

---
Return to [Architecture Overview](../README.md)
