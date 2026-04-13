# Business Flow Support Guide

**Architecture:** {{metadata.name}}

---

{{#each flows}}
## {{name}}

**Description:** {{description}}

### Business Impact

| Aspect | Details |
|--------|---------|
| **Impact** | {{metadata.business-impact}} |
| **SLA** | {{metadata.sla}} |
| **Degraded Mode** | {{metadata.degraded-behavior}} |
| **Customer Message** | {{metadata.customer-communication}} |

### Flow Path

| Step | Relationship | Description |
|------|--------------|-------------|
{{#each transitions}}
| {{sequence-number}} | `{{relationship-unique-id}}` | {{description}} |
{{/each}}

### Troubleshooting Checklist

When this flow is degraded:

1. Check the health endpoints for each service in the flow
2. Review circuit breaker status between services
3. Check message broker queue depths (if async)
4. Review recent deployments to services in this flow
5. Check database replication lag

---

{{/each}}
