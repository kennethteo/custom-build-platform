# Pattern Selection Matrix

Purpose: Provide a quick comparative decision aid to choose an architecture style aligned to context, constraints, and desired DevOps outcomes.

## Usage

1. Identify primary driver (speed, scale, consistency, cost efficiency, event reactivity, minimal ops).  
2. Score candidate patterns using matrix heuristics (qualitative High/Medium/Low).  
3. Validate top 1–2 via lightweight spike & fitness function prototype.  
4. Record decision & rationale in an ADR (see `adr-template.md`).

## Legend

- High: Strong alignment / native strength
- Medium: Achievable with added design effort
- Low: Misaligned; requires compensating complexity

## Comparative Matrix

| Dimension / Goal | Modular Monolith | Microservices | Event-Driven | API Gateway & BFF | CQRS & Event Sourcing | Serverless |
| ---------------- | ---------------- | ------------- | ------------ | ----------------- | -------------------- | ---------- |
| Team Size Fit | Small–Medium (High) | Medium–Large (High) | Medium–Large (Medium) | Any (High) | Specialized (Low–Medium) | Small–Medium (High) |
| Deployment Frequency | Medium | High | High (async decoupling) | Medium–High | Medium (complexity drag) | High (per function) |
| Operational Complexity | Low | High | Medium–High | Medium | High | Low–Medium |
| Failure Isolation | Medium | High | High | Medium | High | Medium |
| Latency (Sync) | High (in-process) | Medium | Medium (async eventual) | Medium | Medium | Variable (cold starts) |
| Scalability Granularity | Coarse | Fine | Fine (consumers) | Medium | Medium | Fine (per function) |
| Consistency Model | Strong (single DB) | Context-local | Eventual | Inherited | Eventual (projections) | Varies (per service) |
| Audit Trail / Replay | Low (extra work) | Medium | Medium (events) | Low | High (inherent) | Medium |
| Cost Efficiency (Low Load) | High | Medium | Medium | Medium | Medium | High |
| Polyglot Support | Low–Medium | High | High | Medium | High | High |
| Time-to-Market Early | High | Medium | Medium | Medium | Low | High |
| Cognitive Load | Low | High | High | Medium | High | Medium |
| Regulated Audit Needs | Medium | Medium | Medium | Medium | High | Medium |
| Vendor Lock-In Risk | Low | Low–Medium | Medium | Medium | Medium | Medium–High |
| Tooling Maturity Ecosystem | High | High | High | High | Medium | High |

## Selection Heuristics

| Driver | Prefer | Avoid |
| ------ | ------ | ----- |
| Fast initial delivery, small team | Modular Monolith / Serverless | Microservices (premature) |
| Independent scale & frequent releases | Microservices | Large Monolith scaling issues |
| Complex read models / audit trail | CQRS & Event Sourcing | Simple CRUD domains |
| Event reactivity + extension points | Event-Driven + Microservices | Modular Monolith (unless evolving) |
| Rich multi-channel client experiences | API Gateway & BFF + Microservices | Direct client → many services |
| Minimize ops management | Serverless / Modular Monolith | Polyglot early microservices |

## Decision Flow (Simplified)

1. Start Modular Monolith unless clear independent capability scaling need.  
2. Introduce Event-Driven for decoupling once integration churn rises.  
3. Add API Gateway & BFF when >1 major client channel emerges.  
4. Apply Microservices selectively where bounded context stress metrics exceed threshold (cycle time, deploy friction).  
5. Adopt CQRS & Event Sourcing only where temporal queries, audit, or invariant complexity justify cost.  
6. Use Serverless for sporadic workloads, glue logic, and rapid edge experimentation.

## Fitness Function Pre-Check Examples

| Goal | Simple Prototype Test |
| ---- | --------------------- |
| Boundary Autonomy | Simulated change deploy cycle time vs baseline |
| Latency Impact | p95 comparison after introducing intermediate layer |
| Event Throughput | Publish/consume lag under load test |
| Cost Model | Monthly cost projection at expected QPS |
| Data Consistency | Staleness window measurement for projections |

## Governance

- Matrix reviewed quarterly; update weights if org strategy shifts (e.g., platform maturity increases lowers microservices cognitive load).
- Tie each ADR to matrix snapshot (include hash or version tag).
- Track post-implementation review: Did chosen pattern achieve stated KPI improvements within 90 days?

---
Return to [Architecture Overview](../README.md)
