# Event-Driven Architecture (EDA)

## Intent

Enable loosely coupled, scalable, and extensible interactions between services via asynchronous events (facts) representing state changes or intents.

## Core Concepts

| Concept | Description |
| ------- | ----------- |
| Event | Immutable fact about something that happened (past tense) |
| Event Stream | Append-only ordered log of events for a topic/key |
| Publisher | Emits events after performing state change (often via outbox) |
| Consumer | Reacts to events, materializes views or triggers workflows |
| Choreography | Distributed flow where events trigger downstream actions |
| Orchestration | Central coordinator drives process progression |

## When To Use

- Need extension points without redeploying producers
- High write volume with diverse read model requirements
- Desire to decouple team release cycles
- Auditability via immutable history
- Reactive / near-real-time analytics & projections

## When Not To Use

- Strong need for immediate globally consistent state
- Very low event volume (complexity overhead)
- Immature observability or schema governance

## Styles Comparison

| Style | Pros | Cons | Use When |
| ----- | ---- | ---- | -------- |
| Choreography | High autonomy, scalable | Hard to visualize, hidden cycles | Short linear flows |
| Orchestration | Explicit control & visibility | Central complexity point | Branching / long-running workflows |

## Event Modeling Guidelines

- Name events as past tense facts (OrderPlaced)
- Prefer granular state change events over command echoes
- Avoid leaking internal entity fields likely to churn
- Use additive schema evolution with version indicator (schemaVersion)

## Schema & Contract Governance

| Practice | Automation |
| -------- | ---------- |
| AsyncAPI specs stored centrally | Lint + diff in CI |
| Backward compatibility checks | Build fails on break |
| Consumer contract verification | Pact / custom harness |
| Schema registry (Avro/Protobuf) | BACKWARD compatibility policy |

## Delivery Guarantees

| Guarantee | Mechanisms | Trade-Offs |
| --------- | ---------- | ---------- |
| At-least-once | Idempotent consumers + retries | Duplicates |
| Exactly-once (semantic) | Outbox + dedupe keys + idempotent writes | Complexity |
| At-most-once | No retries | Data loss risk |

## Fitness Functions

| Objective | Check | Target |
| --------- | ----- | ------ |
| Event Lag | Consumer group max lag | < SLA per stream |
| Duplication Handling | Duplicate processing test suite | No side-effect variance |
| Schema Evolution | Breaking change detection | 0 unauthorized breaks |
| Processing Time | p95 publish→materialize latency | < SLA threshold |

## Operational Considerations

### Observability

- Propagate trace context from producers to consumers
- Lag dashboards + DLQ volume alarms

### Resilience

- DLQ with automated reprocessing workflow
- Backpressure (consumer concurrency throttle)

### Data

- Replay support: store raw events separate from projections
- Encrypt sensitive payload segments when required

### Security

- Topic ACLs (least privilege)
- Hash/sign critical business events if regulatory

## Evolution & Migration

| Scenario | Strategy |
| -------- | -------- |
| Legacy synchronous chain | Add outbox + event emission on side effects |
| Data replication to new service | Build projection consumer first then redirect reads |
| Introduce orchestration | Add workflow engine (Temporal / Camunda) |

## Anti-Patterns

- Event storms (over-granularity)
- Using events for request/response
- Broker-specific header logic bleeding into domain payload
- Orphan topics without retention governance

## Tooling Alignment

| Concern | Java | .NET | Node.js |
| ------- | ---- | ---- | ------- |
| Broker Clients | spring-kafka, Pulsar, RabbitMQ | Confluent .NET, MassTransit | KafkaJS, NATS.js, amqplib |
| Schema | Avro + Registry | Avro/Protobuf + registry | Avro/Protobuf libs |
| Workflow | Temporal, Camunda | Dapr, Durable Functions | Temporal Node |
| Testing | Testcontainers | Testcontainers | Testcontainers |

## Checklist

- [ ] Event naming & domain dictionary established
- [ ] AsyncAPI / schema registry entries committed
- [ ] Outbox pattern implemented for transactional producers
- [ ] Idempotent consumer design validated
- [ ] Lag & DLQ dashboards & alerts live
- [ ] Replay procedure documented & tested
- [ ] Retention & compaction policies defined
- [ ] Security: topic ACLs & encryption validated

## References

- Designing Data-Intensive Applications (Kleppmann)
- Enterprise Integration Patterns (Hohpe)
- AsyncAPI Initiative
- Temporal & Saga pattern docs

---
Return to [Reference Styles](./README.md)
