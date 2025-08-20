# Architectural Principles

## Intent

Define enduring decision guardrails optimizing for flow, operability, resilience, and evolvability.

## Principles

1. Fast Flow First (optimize lead time, small batch)
2. Explicit Domain Boundaries (bounded contexts, clear contracts)
3. Observability by Default (logs, metrics, traces in templates)
4. Automate Architecture Verification (fitness functions)
5. Minimize Cognitive Load (golden paths, platform abstractions)
6. Resilience as a Requirement (graceful degradation, backpressure)
7. Cost & Performance Visibility (budgets measurable in pipeline)
8. Backwards-Compatible Evolution (versioned contracts, deprecation windows)
9. Data Ownership & Lineage (domain-aligned schemas, traceable flows)
10. Platform Leverage over Boilerplate (shared infra > bespoke builds)

## Fitness Functions (Examples)

| Area | Example Test | Tool |
|------|--------------|------|
| Layering | Domain cannot depend on Web | ArchUnit / NetArchTest |
| Dependency Hygiene | No deprecated libs present | Custom script / dep-cruiser |
| API Stability | Contract diff has no breaking change | Pact / OpenAPI diff |
| Performance | p95 latency < threshold in smoke test | k6 / Locust |
| Observability | Required spans present | Trace assertion harness |

## Implementation Hooks

- Each service includes /architecture-tests.
- Pipeline stage: architecture-verify (non-functional gates).

## Review & Evolution

Quarterly revisit; supersede via ADR referencing retired principle.
