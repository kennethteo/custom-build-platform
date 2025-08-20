# Modular Monolith

## Intent

Provide evolutionary path with strong internal boundaries before/without splitting into distributed microservices.

## When to Use

- Domain still volatile
- Low team count / low operational overhead tolerance
- Latency-sensitive synchronous flows

## When to Avoid

- Independent scale or deployment cadence per module mandatory
- Hard multi-language/runtime requirements

## Structure

- Single deployable
- Enforced module boundaries (package / namespace rules)
- Internal contracts via interfaces

## Fitness Functions

| Concern | Rule | Tool |
|---------|------|------|
| Layer isolation | Module A cannot depend on Module B internals | ArchUnit / NetArchTest |
| Dependency hygiene | No circular references | dep-cruiser / custom |
| Public surface | Exported APIs enumerated & diffed | script + OpenAPI diff |

## Operational Considerations

- Single scaling profile (vertical + horizontal if feasible)
- Shared resource contention risk (profiling required)
- Coordinated rollback simpler

## Evolution Path

1. Identify module with divergent scale/time-to-market
2. Extract contract (API + events)
3. Externalize datastore façade (strangler pattern)
4. Deploy as separate service; deprecate internal calls

## Anti-Patterns

- Big ball of mud (no module boundaries enforced)
- Leaking internals across modules
- Premature extraction without data ownership clarity
