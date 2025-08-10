# Resilience Patterns

## Intent

Ensure services gracefully handle faults, degrade predictably, and self-heal to maintain user experience within SLOs despite component failures, latency spikes, and dependency exhaustion.

## Principles

- Design for failure: assume every network call can timeout, error, or return partial data.
- Fail fast & limit blast radius (timeouts, bulkheads, circuit breakers).
- Prefer graceful degradation over hard failure (fallbacks, stale data, partial responses).
- Automate validation of resilience with chaos & fault injection.
- Observability-driven: resilience signals visible (retries, breaker states, shed load counts).

## Core Patterns

| Pattern | Problem | Solution | Trade-Offs |
| ------- | ------- | -------- | ---------- |
| Timeout | Infinite wait on hung dependency | Bounded wait + cancel | Risk premature timeout if too aggressive |
| Retry (Idempotent) | Transient fault | Bounded attempts + backoff + jitter | Amplified load if misconfigured |
| Circuit Breaker | Repeated failure causing resource waste | Open circuit after threshold; half-open probe | Adds state & tuning complexity |
| Bulkhead | Resource starvation from noisy neighbor | Pool/queue isolation per dependency | Underutilization if partition too small |
| Rate Limiting | Overload from excess requests | Token bucket / leaky bucket checks | Potential denial for bursts |
| Load Shedding | Protect core latency under saturation | Drop lower-priority or over-budget requests | Some requests sacrificed |
| Fallback | Upstream unavailable | Alternative static / cached / reduced answer | Potential staleness / inaccuracy |
| Idempotency Key | Duplicate request attempts | Ignore duplicates based on key | Storage overhead for keys |
| Backpressure | Downstream slower than producer | Slow producer / buffer / shed | Increased latency or data loss risk |

## Architecture Layers of Defense

1. Client-level: timeouts, hedging (optional), idempotency keys.  
2. Service-level: retries (idempotent), circuit breakers, bulkheads.  
3. Platform-level: autoscaling, rate limiting, load shedding, queue buffering.  
4. Organizational: chaos engineering, game days, incident response runbooks.

## Fitness Functions

| Objective | Automated Check | Target |
| --------- | --------------- | ------ |
| Timeout Coverage | % external calls with explicit timeout | 100% |
| Breaker Effectiveness | Mean time open before stable half-open success | Improving trend |
| Retry Discipline | % retries exceeding policy (e.g., >3) | < 1% total calls |
| Error Budget Health | Burn rate multi-window within policy | ≤ thresholds |
| Failure Isolation | Single dependency failure increases error rate | < defined % global |

## Operational Considerations

### Configuration Strategy

- Centralized policy definitions (timeout, retry budgets) with service overrides.
- Versioned resilience config; diff checked in CI.

### Tuning Guidelines

- Timeout: P99(dep) * 1.2 (cap with global budget) → adjust via telemetry.
- Retries: 2–3 attempts, exponential backoff + jitter; never indefinite.
- Circuit breaker thresholds: rolling window failures %, minimum request volume.

### Testing & Chaos

- Fault injection: latency, aborts, resource exhaustion (CPU/mem) in staging.
- Chaos schedule: weekly light (pod kill), monthly heavy (dependency blackhole).
- Verify SLO impact + automated rollback triggers.

### Observability Metrics

- retry_count, retry_exhausted_count
- circuit_breaker_open_total
- request_timeout_total
- shed_requests_total
- fallback_invocations_total

### Deployment

- Progressive rollout with resilience metrics watch (error rate, latency, saturation).
- Auto rollback on error budget burn > threshold during canary.

## Anti-Patterns

- Blind retries on non-idempotent operations (duplicate side-effects).
- Infinite timeouts or relying on default library timeouts.
- Catch-all exception swallowing without metrics.
- Circuit breakers that never close (mis-tuned) or always open (too strict).
- Overusing bulkheads causing resource fragmentation.

## Tooling Alignment

| Concern | Java | .NET | Node.js |
| ------- | ---- | ---- | ------- |
| Resilience Lib | Resilience4j | Polly | opossum / p-retry |
| Chaos | Chaos Mesh / ToxiProxy / Litmus | ToxiProxy | ToxiProxy / Gremlin |
| Load Testing | k6 / Gatling | k6 | k6 |
| Policy Mgmt | Spring Cloud Config / OPA | App Configuration + OPA | Config service + OPA |
| Metrics | Micrometer (retry, breaker) | .NET counters | OpenTelemetry metrics |

## Implementation Checklist

- [ ] Explicit timeouts on all external calls
- [ ] Idempotent retries with capped attempts & jitter
- [ ] Circuit breakers configured & monitored
- [ ] Bulkhead / connection pool isolation applied
- [ ] Load shedding or queue buffering strategy defined
- [ ] Fallbacks documented & tested for critical paths
- [ ] Chaos experiments scheduled & automated
- [ ] Resilience metrics dashboards & alerts active
- [ ] Runbook includes failure isolation steps

## References

- Release It! (Nygard)
- Google SRE (Error Budgets & Overload)
- Netflix Hystrix lineage / Polly / Resilience4j docs

---
Return to [Architecture Overview](../README.md)
