# Microservices Architecture

## Intent

Decompose a complex domain into a suite of small, autonomous services that can be developed, deployed, and scaled independently to optimize team autonomy, deployment frequency, and evolutionary change.

## When To Use

- Independent business capabilities with distinct change cadences
- Need for differential scaling (hot vs cold paths)
- High deployment frequency impeded by large coordination overhead
- Polyglot technology or runtime specialization requirements
- Strong need for failure isolation / blast radius reduction

## When Not To Use

- Small team (≤6 engineers) with limited operational capacity
- Highly coupled transactional consistency across the whole domain
- Early product discovery where domain boundaries are fluid
- Lack of baseline platform (observability, CI/CD, service templates) increasing cognitive load
- Extreme low latency synchronous call chains with unavoidable fan‑out

## Structural Overview

| Aspect | Recommendation |
| ------ | -------------- |
| Boundary Definition | Domain-driven design (DDD) bounded contexts; start coarse then split by stress signals |
| Integration Styles | Prefer async eventing for decoupling; use synchronous only for real-time read needs |
| API Shape | Explicit versioning (URI or media type); backward compatible additive change policy |
| Data Ownership | One service = authoritative aggregate store; no shared mutable databases |
| Contracts | Consumer-driven contract tests (e.g. Pact) + OpenAPI/AsyncAPI artifacts in central catalog |
| Resilience | Bulkheads + circuit breakers + timeout budget ≤ (P99 SLA * 0.3) per hop |
| Deployment Unit | One service per independently versioned repo or mono-repo module with ownership metadata |

### Reference Partitioning Flow

1. Identify business capabilities (value stream mapping)  
2. Draft candidate bounded contexts  
3. Define ubiquitous language & ownership  
4. Model aggregates / transactional invariants  
5. Align deployment surface (service) to boundary (avoid premature fragmentation)  
6. Establish contract change policy & versioning scheme  
7. Instrument golden signals before scale-out.

## Key Design Decisions

- Boundary discovery method (DDD event storming vs evolutionary splitting)
- Sync vs async integration proportions & allowed patterns
- Technology variance policy (e.g. 80% standard, 20% innovation budget)
- Versioning & deprecation timelines (e.g. 6 months supported overlap)
- Service discovery & naming conventions
- Multi-tenancy strategy (pooled schema vs database-per-tenant vs row-level)

## Fitness Functions

| Objective | Fitness Function (Automated) | Target |
| --------- | ---------------------------- | ------ |
| Coupling | Static dependency graph: no new cross-domain imports (dependency-cruiser, ArchUnit) | 0 violations |
| Latency Budget | End-to-end p95 < SLO; each service adds <15% total budget | Canary check pass |
| Operational Readiness | Dashboards & alerts exist before prod deploy | 100% gates |
| API Stability | Breaking change detector vs previous OpenAPI diff | 0 unapproved breaks |
| Deploy Frequency | Deploys per service per week | ≥ org target |

## Operational Considerations

### Observability

- Structured JSON logging with correlation (trace/span) IDs (W3C Trace Context)
- RED / USE dashboards auto-provisioned
- OpenTelemetry SDK included in template

### Resilience

- Mandatory timeouts & retries (idempotent operations only)
- Circuit breakers for synchronous calls
- Weekly chaos experiments (latency injection, pod kill)

### Performance

- k6 load test for composite flows pre-prod (baseline stored)
- Capacity model: QPS per pod > P95 * 1.5 headroom

### Security

- mTLS + short‑lived service identities (SPIFFE/JWT)
- Network policies: deny-all then allow explicit service egress

### Data

- Outbox pattern for reliable event publication
- Domain data retention & encryption policies

### Deployment

- Progressive delivery (canary + automated rollback on SLO regression)
- Immutable images; config via env + secrets store

## Evolution & Migration

| Stage | Indicator | Action |
| ----- | --------- | ------ |
| Monolith | High cycle time due to shared codebase | Extract seams via modular monolith first |
| Pilot Services | First 2–3 services stable | Formalize golden templates |
| Scale-Out | >3 teams onboarded | Domain governance review cadence |
| Optimization | Latency / cost pressure | Merge or consolidate nano-services |

## Anti-Patterns & Pitfalls

- Nano-services causing chatty networks
- Shared database schemas coupling releases
- Distributed monolith: synchronous chains without resilience
- Duplicate domain logic from weak ubiquitous language
- Ignoring ops toil / pager fatigue signals

## Tooling & Framework Alignment

| Concern | Java | .NET | Node.js |
| ------- | ---- | ---- | ------- |
| HTTP Service | Spring Boot / Micronaut | ASP.NET Core | Fastify / NestJS |
| Async Messaging | Spring Cloud Stream (Kafka) | MassTransit / Dapr | KafkaJS / NATS / Dapr |
| Contract Testing | Pact JVM | Pact .NET | Pact JS |
| Resilience | Resilience4j | Polly | opossum |
| Telemetry | OpenTelemetry Agent | OpenTelemetry .NET | OpenTelemetry Node |
| Packaging | Jib / Buildpacks | Buildpacks | Docker / Buildpacks |

## Implementation Checklist

- [ ] Bounded context owner defined
- [ ] Aggregates & invariants documented
- [ ] API spec (OpenAPI/AsyncAPI) published & validated
- [ ] Resilience policies configured (timeouts, retries, circuit breakers)
- [ ] Observability baseline (logs, metrics, traces, dashboards)
- [ ] Runbook & SLOs (availability, latency) defined
- [ ] Contract tests gating deployment
- [ ] Security scanning + SBOM (syft) + signing (cosign)
- [ ] Data retention & backup strategy documented
- [ ] Chaos experiment scheduled

## References

- Team Topologies
- Domain-Driven Design (Evans)
- Microservices Patterns (Richardson)
- Google SRE Workbook

---
Return to [Reference Styles](./README.md)
