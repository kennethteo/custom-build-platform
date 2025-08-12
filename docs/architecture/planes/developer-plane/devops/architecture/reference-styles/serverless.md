# Serverless Architecture

## Intent

Accelerate delivery by delegating infrastructure & scaling management to the cloud provider, paying per execution while focusing on event-driven business logic.

## Characteristics

| Attribute | Description |
| --------- | ----------- |
| Compute Model | Ephemeral functions triggered by events (HTTP, queue, schedule, blob) |
| Scaling | Automatic horizontal scaling to zero (cold start) |
| Billing | Per invocation time & resources used |
| State | Externalized (DB, cache, object storage) |
| Deployment | Zip bundle or container image |

## When To Use

- Spiky / unpredictable workloads
- Rapid prototyping with low ops overhead
- Event-centric integrations & lightweight APIs
- Glue logic / workflow steps

## When Not To Use

- Sustained high-throughput steady workloads (cost threshold)
- Long-running streaming or heavy compute with predictable latency needs
- Complex orchestration needing fine-grained environment control

## Design Guidelines

- Single-responsibility functions; compose via events/workflows (Step Functions, Durable Functions)
- Minimize cold start: provisioned concurrency or lean language/runtime
- Externalize configuration & secrets (Parameter Store / Key Vault)
- Idempotency keys for retry semantics (request IDs, conditional writes)

## Architecture Patterns

| Pattern | Use |
| ------- | --- |
| Function per Route | Simple CRUD APIs |
| API Gateway + Function | Public REST/HTTP ingress |
| Queue/Stream Trigger | Async processing & buffering |
| Orchestrator (Step/Durable) | Saga / long-running workflow |
| Fan-out / Map | Parallel batch processing |

## Fitness Functions

| Objective | Function | Target |
| --------- | -------- | ------ |
| Cold Start | p95 init latency (package size) | < 500ms (HTTP) |
| Cost Efficiency | $/1000 req vs container baseline | ≤ baseline or justified |
| Error Rate | Failed invocations / total | < SLO budget |
| Concurrency | Reserved concurrency utilization | < 80% sustained |
| Security | Functions missing least-privilege IAM policy | 0 |

## Operational Considerations

### Observability

- Trace context injection at gateway → function spans
- Structured logs aggregated via provider service then exported

### Resilience

- Dead-letter queue or failure destinations configured
- Retry policies tuned per trigger type (avoid poison loops)

### Performance

- Bundle only used dependencies (tree-shake); layer shared libs
- Warm critical paths (scheduled keep-alive or provisioned concurrency)

### Security

- Least privilege IAM per function
- Dependency (SCA) scan & artifact signing (cosign)
- TLS enforced at managed edges

### Cost Management

- Tag functions for cost allocation
- Monitor top cost contributors; optimize duration & memory

### Vendor Lock-In Mitigation

- Abstract business logic from provider SDK (ports/adapters)
- Use open standards (OpenTelemetry, CloudEvents)

## Evolution Strategy

| Stage | Focus |
| ----- | ----- |
| Prototype | Fast iteration & coverage |
| Harden | Observability & security baselines, idempotency |
| Optimize | Tune memory/time trade-offs, cold start mitigation |
| Scale | Multi-region / failover, cost governance automation |

## Anti-Patterns

- God function with internal routing
- Chatty synchronous chains (should use events/queues)
- Heavy init dependency loading (cold start bloat)
- Hidden state in /tmp relied upon for correctness

## Tooling Alignment

| Concern | AWS | Azure | Multi-Cloud |
| ------- | --- | ----- | ---------- |
| Functions | Lambda | Azure Functions | Knative / OpenFaaS |
| Orchestration | Step Functions | Durable Functions | Temporal |
| API | API Gateway / ALB | API Management / Functions Proxy | Kong / APISIX |
| IaC | CDK / Terraform | Bicep / Terraform | Terraform / Crossplane |

## Checklist

- [ ] Function boundaries & triggers documented
- [ ] Idempotency strategy implemented
- [ ] Least-privilege IAM / role assignments validated
- [ ] Observability: logs, metrics, traces exported
- [ ] Cold start metrics monitored & acceptable
- [ ] Cost dashboards & anomaly alerts configured
- [ ] Security scanning & signing integrated
- [ ] DR / region failover strategy defined (if required)

## References

- AWS Lambda Operator Guide
- Azure Functions Best Practices
- CNCF CloudEvents
- Serverless Patterns collection

---
Return to [Reference Styles](./README.md)
