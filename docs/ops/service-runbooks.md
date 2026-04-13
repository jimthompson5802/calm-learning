---
architecture: ../../architectures/ecommerce-platform.json
---
# Service Runbooks

Generated from architecture: 

---

## Load Balancer

**Unique ID:** `load-balancer`

### Ownership

| Field | Value |
|-------|-------|
| Owner | platform-team@example.com |
| On-Call Slack | #oncall-platform |
| Tier | tier-1 |
| Runbook | https://runbooks.example.com/load-balancer |

### Health & Monitoring

- **Health Endpoint:** `/health`
- **Dashboard:** https://grafana.example.com/d/load-balancer

### Known Failure Modes

No failure modes documented yet.

---

## API Gateway Instance 1

**Unique ID:** `api-gateway-1`

### Ownership

| Field | Value |
|-------|-------|
| Owner | platform-team@example.com |
| On-Call Slack | #oncall-platform |
| Tier | tier-1 |
| Runbook | https://runbooks.example.com/api-gateway |

### Health & Monitoring

- **Health Endpoint:** `/actuator/health`
- **Dashboard:** https://grafana.example.com/d/api-gateway

### Known Failure Modes

No failure modes documented yet.

---

## API Gateway Instance 2

**Unique ID:** `api-gateway-2`

### Ownership

| Field | Value |
|-------|-------|
| Owner | platform-team@example.com |
| On-Call Slack | #oncall-platform |
| Tier | tier-1 |
| Runbook | https://runbooks.example.com/api-gateway |

### Health & Monitoring

- **Health Endpoint:** `/actuator/health`
- **Dashboard:** https://grafana.example.com/d/api-gateway

### Known Failure Modes

No failure modes documented yet.

---

## Order Service

**Unique ID:** `order-service`

### Ownership

| Field | Value |
|-------|-------|
| Owner | platform-team@example.com |
| On-Call Slack | #oncall-orders |
| Tier | tier-1 |
| Runbook | https://runbooks.example.com/order-service |

### Health & Monitoring

- **Health Endpoint:** `/actuator/health`
- **Dashboard:** https://grafana.example.com/d/order-service

### Known Failure Modes

#### HTTP 503 errors

| Aspect | Details |
|--------|---------|
| **Likely Cause** | Database connection pool exhausted |
| **How to Check** | Check connection pool metrics in Grafana dashboard |
| **Remediation** | Scale up service replicas or increase pool size |
| **Escalation** | If persists &gt; 5min, page DBA team |

#### High latency (&gt;2s p99)

| Aspect | Details |
|--------|---------|
| **Likely Cause** | Payment service degradation |
| **How to Check** | Check payment-service health and circuit breaker status |
| **Remediation** | Circuit breaker should open automatically; check fallback queue |
| **Escalation** | Contact payments-team if circuit breaker not triggering |

#### Order validation failures

| Aspect | Details |
|--------|---------|
| **Likely Cause** | Inventory service returning stale data |
| **How to Check** | Verify inventory-service cache TTL and database replication lag |
| **Remediation** | Clear inventory cache; check replica sync status |
| **Escalation** | Contact platform-team for cache issues |


---

## Inventory Service

**Unique ID:** `inventory-service`

### Ownership

| Field | Value |
|-------|-------|
| Owner | platform-team@example.com |
| On-Call Slack | #oncall-inventory |
| Tier | tier-2 |
| Runbook | https://runbooks.example.com/inventory-service |

### Health & Monitoring

- **Health Endpoint:** `/actuator/health`
- **Dashboard:** https://grafana.example.com/d/inventory-service

### Known Failure Modes

#### Stale stock levels returned

| Aspect | Details |
|--------|---------|
| **Likely Cause** | Database replication lag on read queries |
| **How to Check** | Check replication lag in inventory-db replica metrics |
| **Remediation** | Route reads to primary temporarily; investigate replica sync |
| **Escalation** | Page DBA team if replication lag exceeds 30s |

#### Inventory reservation timeouts

| Aspect | Details |
|--------|---------|
| **Likely Cause** | Inventory database connection pool exhausted or slow queries |
| **How to Check** | Review slow query log and connection pool utilisation in Grafana |
| **Remediation** | Kill long-running queries; increase pool size if sustained |
| **Escalation** | Contact platform-team if pool utilisation consistently above 80% |

#### Restocking alerts not firing

| Aspect | Details |
|--------|---------|
| **Likely Cause** | Threshold config misconfiguration or alerting pipeline failure |
| **How to Check** | Verify alert thresholds in config and check alerting service health |
| **Remediation** | Redeploy alerting config; manually trigger stock review if critical |
| **Escalation** | Contact platform-team for alerting infrastructure issues |


---

## Payment Service

**Unique ID:** `payment-service`

### Ownership

| Field | Value |
|-------|-------|
| Owner | platform-team@example.com |
| On-Call Slack | #oncall-payments |
| Tier | tier-1 |
| Runbook | https://runbooks.example.com/payment-service |

### Health & Monitoring

- **Health Endpoint:** `/actuator/health`
- **Dashboard:** https://grafana.example.com/d/payment-service

### Known Failure Modes

#### Payment authorisation failures

| Aspect | Details |
|--------|---------|
| **Likely Cause** | Downstream payment gateway unavailable or rejecting requests |
| **How to Check** | Check payment gateway status page and outbound error rate in Grafana |
| **Remediation** | Retry with exponential backoff; switch to secondary gateway if available |
| **Escalation** | Page payments-team immediately; SLA breach risk within 5 minutes |

#### Messages not being consumed from queue

| Aspect | Details |
|--------|---------|
| **Likely Cause** | Service crash, consumer thread stuck, or AMQP connection lost |
| **How to Check** | Check service health endpoint and RabbitMQ consumer count for order-queue |
| **Remediation** | Restart service pod; verify AMQP credentials and broker connectivity |
| **Escalation** | Contact platform-team if queue depth exceeds 1000 messages |

#### Duplicate payment charges

| Aspect | Details |
|--------|---------|
| **Likely Cause** | Idempotency key not being respected; retry storm from upstream |
| **How to Check** | Audit payment logs for duplicate transaction IDs within last 15 minutes |
| **Remediation** | Halt retries immediately; reconcile with payment gateway |
| **Escalation** | Escalate to payments-team and finance on-call immediately |


---

