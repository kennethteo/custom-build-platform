# API Gateway & BFF

## Intent

Provide controlled ingress (API Gateway) for cross-cutting concerns (authN/Z, rate limiting, routing) and channel-specific Backend For Frontend (BFF) services tailored to client experience (web, mobile, partner) to optimize performance & reduce client complexity.

## Problem Context

- Direct client → many microservices induces chattiness & coupling
- Different channels require divergent aggregation & latency profiles
- Centralized security & observability enforcement required

## Architecture Roles

| Component | Responsibility |
| --------- | -------------- |
| API Gateway | Edge termination, routing, authN/Z, rate limiting, request transformation, observability enrichment |
| BFF | Orchestrate/aggregate service calls per interaction contract, adapt domain to view |
| Downstream Services | Channel-agnostic domain APIs & events |

## When To Use

- Multiple client types (web, native mobile, partner)
- Need consistent security policy enforcement
- High risk of client breaking changes from domain API evolution

## When Not To Use

- Single simple client with low latency path
- Early MVP where added layers slow feedback
- Gateway acts only as a thin pass-through (no value add)

## Design Guidelines

- Gateway: minimal business logic (policy yes, domain no)
- Each BFF owned by team of its primary client
- Contract versioning with deprecation lifecycle
- GraphQL or tailored REST in BFF; domain REST/async events downstream
- Explicit cache policy (TTL, ETag, validation)

## Cross-Cutting Concerns at Gateway

| Concern | Implementation Notes |
| ------- | -------------------- |
| AuthN | OIDC/JWT validation; optional mTLS internal |
| AuthZ | Policy engine (OPA / Cedar) or plugin-based RBAC/ABAC |
| Rate Limiting | Token bucket per API key / client id |
| Threat Protection | WAF + schema validation (OpenAPI/GraphQL) |
| Observability | Correlation ID injection, metrics, structured logs |
| Transformation | Protocol translation (HTTP↔gRPC), header normalization |

## Fitness Functions

| Objective | Function | Target |
| --------- | -------- | ------ |
| Over/Under-fetch | Useful fields / total transferred | ≥ 0.8 |
| Latency Budget | p95 gateway overhead vs direct backend | < 15% added |
| Security Coverage | % routes with auth & rate limit policy | 100% |
| Logic Leakage | Domain logic lines detected in BFF (static rules) | 0 critical |

## Operational Considerations

- Canary gateway rule changes separate from service deploys
- Central schema registry with automated diff & alert
- Synthetic monitoring for top user journeys through BFF

## Evolution Strategy

| Stage | Focus |
| ----- | ----- |
| Initial | Auth + routing + minimal rate limiting |
| Growth | Add separate BFF per major channel; GraphQL federation if needed |
| Optimization | Edge caching, fine-grained rate policies, request collapsing |
| Consolidation | Remove unused routes, deprecate old versions |

## Anti-Patterns

- Gateway accumulating domain logic
- Single mega-BFF serving all channels
- Breaking changes without diff enforcement
- Behavior toggled via undocumented custom headers

## Tooling Alignment

| Layer | Options |
| ----- | ------- |
| Gateway | Kong, APISIX, NGINX, Azure APIM, AWS API Gateway, Envoy, Istio ingress |
| BFF (Java) | Spring GraphQL, Spring WebFlux |
| BFF (.NET) | ASP.NET Minimal APIs, HotChocolate GraphQL |
| BFF (Node) | NestJS, Fastify, Apollo Server |
| AuthZ | OPA (Rego), Cedar, custom policy service |

## Checklist

- [ ] Public API spec published & versioned
- [ ] Route ownership metadata stored centrally
- [ ] Auth & rate limiting on 100% routes
- [ ] BFF implements schema & input validation
- [ ] GraphQL (if used) persisted queries / cost limits
- [ ] Synthetic journey & SLO dashboards live
- [ ] Deprecation policy & timeline documented

## References

- API Gateway pattern (AWS / Microsoft)
- Backend For Frontend (Sam Newman)
- GraphQL best practices (Apollo)

---
Return to [Reference Styles](./README.md)
