# CQRS & Event Sourcing

## Intent

Separate write (command) and read (query) models to optimize for domain invariants & scaling read projections independently, while persisting domain changes as an append-only sequence of events forming the single source of truth.

## Applicability

| Use When | Avoid When |
| -------- | ---------- |
| Complex aggregate invariants & temporal reasoning | Simple CRUD suffices |
| High read fan-out with divergent view requirements | Low scale, single view |
| Regulatory/audit trail required | Team lacks event modeling experience |
| Need for time-travel & replay | Need global ACID across many aggregates |

## Conceptual Model

1. Command validates intent & business rules then emits domain events (uncommitted)  
2. Events appended to event store atomically  
3. Projections subscribe & build read models (denormalized, search, cache)  
4. Queries served from these materialized views (eventual consistency)  
5. Snapshots (optional) accelerate aggregate rehydration

## Key Design Decisions

- Event store technology (log vs purpose-built vs relational append table)
- Snapshot cadence & size trade-offs
- Projection idempotency model (upsert vs version check vs hash compare)
- Consistency staleness windows & client communication
- Event schema evolution & upcasting strategy

## Event Design Guidelines

- Aggregate-focused events (no multi-aggregate coupling)
- Version every event schema (additive changes preferred)
- Store minimal necessary business facts; derive views externally
- Correlation & causation IDs for saga traceability

## Fitness Functions

| Objective | Function | Target |
| --------- | -------- | ------ |
| Rebuild Integrity | Full projection rebuild hash matches snapshot | 100% |
| Replay Performance | Replay N events within SLA | < target minutes |
| Schema Safety | Diff vs previous (no removals) | 0 unapproved breaks |
| Projection Idempotency | Duplicate delivery test | No side-effect delta |
| Latency | Append → projection availability p95 | < SLA (e.g. 500ms) |

## Operational Considerations

| Area | Considerations |
| ---- | -------------- |
| Storage Growth | Compaction / archival of cold segments; tiered storage |
| Backups | Point-in-time events + projection rebuild scripts tested |
| Monitoring | Append rate, projection lag, rebuild duration |
| Security | Encrypt sensitive event payload fields; strict ACLs |

## Evolution Strategy

| Stage | Focus |
| ----- | ----- |
| Pilot | Single high-value aggregate |
| Expansion | New projections (analytics, search) |
| Optimization | Snapshot tuning, archival policies |
| Hardening | Automated DR rebuild drills |

## Anti-Patterns

- Treating projections as authoritative state
- Presentation fields inside domain events
- Monolithic upcasters mixing business logic
- Skipping replay tests causing silent drift

## Tooling Alignment

| Concern | Options |
| ------- | ------- |
| Event Store | Kafka (aggregate key), EventStoreDB, PostgreSQL append table |
| Framework (Java) | Axon, Lagom, lightweight custom |
| Framework (.NET) | EventStore client, Marten |
| Framework (Node) | node-eventstore, custom + Kafka |
| Testing | Testcontainers + deterministic replay suites |

## Checklist

- [ ] Aggregate boundaries & invariants documented
- [ ] Event naming & versioning strategy defined
- [ ] Event store retention / archival policy configured
- [ ] Projection idempotency & replay tested
- [ ] Snapshot policy implemented & verified (if used)
- [ ] DR full rebuild rehearsal executed & evidence stored
- [ ] Security: encryption & ACLs validated
- [ ] Monitoring dashboards: lag, append rate, replay duration present

## References

- Greg Young (Event Sourcing)
- DDD Patterns & Practices
- Martin Fowler (CQRS, Event Sourcing articles)

---
Return to [Reference Styles](./README.md)
