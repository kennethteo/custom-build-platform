# Architecture Reference Styles

Curated architectural styles with DevOps & operability emphasis. Use these as guardrails and checklists.

## Available Patterns

- [Modular Monolith](./modular-monolith.md)
- [Microservices](./microservices.md)
- [Event-Driven Architecture](./event-driven.md)
- [API Gateway & BFF](./api-gateway-bff.md)
- [CQRS & Event Sourcing](./cqrs-event-sourcing.md)
- [Serverless](./serverless.md)

## Template Sections

Each pattern includes:

- Intent
- Applicability (When to use / avoid)
- Structure / Key Concepts
- Fitness Functions (automatable where possible)
- Operational Considerations (observability, resilience, performance, security, data, deployment)
- Evolution Strategy / Migration
- Anti-Patterns
- Tooling Alignment (Java /.NET / Node.js where relevant)
- Implementation Checklist
- References


## Contributing New Patterns

1. Confirm distinct trade-offs not covered by existing docs.
2. Follow section ordering above.
3. Provide at least 3 measurable fitness functions.
4. Supply multi-language tooling suggestions if applicable.
5. Link back to this index at end of file.
