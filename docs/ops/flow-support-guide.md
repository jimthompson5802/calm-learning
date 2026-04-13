---
architecture: ../../architectures/ecommerce-platform.json
---
# Business Flow Support Guide

**Architecture:** 

---

## Customer Order Processing

**Description:** End-to-end flow from customer placing an order to payment confirmation

### Business Impact

| Aspect | Details |
|--------|---------|
| **Impact** | Customers cannot complete purchases - direct revenue loss |
| **SLA** | 99.9% availability, 30s p99 latency |
| **Degraded Mode** | Orders queue in message broker; processed when service recovers |
| **Customer Message** | Display &#x27;Order processing delayed&#x27; message |

### Flow Path

| Step | Relationship | Description |
|------|--------------|-------------|
| 1 | `customer-uses-platform` | Customer submits order via web interface |
| 2 | `api-gateway-to-order-service` | API Gateway routes order to Order Service |
| 3 | `order-service-publishes-to-queue` | Order Service publishes payment request to message broker |
| 4 | `payment-service-consumes-from-queue` | Payment Service consumes and processes payment request from message broker |

### Troubleshooting Checklist

When this flow is degraded:

1. Check the health endpoints for each service in the flow
2. Review circuit breaker status between services
3. Check message broker queue depths (if async)
4. Review recent deployments to services in this flow
5. Check database replication lag

---

## Inventory Stock Check

**Description:** Admin checks and updates inventory stock levels

### Business Impact

| Aspect | Details |
|--------|---------|
| **Impact** | Stock levels may be inaccurate - risk of overselling |
| **SLA** | 99.5% availability, 500ms p99 latency |
| **Degraded Mode** | Fall back to cached inventory; flag orders for manual review |
| **Customer Message** | Display &#x27;Stock availability being confirmed&#x27; |

### Flow Path

| Step | Relationship | Description |
|------|--------------|-------------|
| 1 | `admin-uses-platform` | Admin requests inventory status |
| 2 | `api-gateway-to-inventory-service` | Route to inventory service |
| 3 | `inventory-service-to-inventory-db` | Query current stock levels |
| 4 | `inventory-service-to-inventory-db` | Return stock data |
| 5 | `api-gateway-to-inventory-service` | Return inventory report |

### Troubleshooting Checklist

When this flow is degraded:

1. Check the health endpoints for each service in the flow
2. Review circuit breaker status between services
3. Check message broker queue depths (if async)
4. Review recent deployments to services in this flow
5. Check database replication lag

---

