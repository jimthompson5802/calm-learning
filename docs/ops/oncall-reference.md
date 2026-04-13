---
architecture: ../../architectures/ecommerce-platform.json
---
# On-Call Quick Reference

**Architecture:** 

## Service Contacts

| Service | Owner | On-Call Channel | Tier |
|---------|-------|-----------------|------|
| Load Balancer | platform-team@example.com | #oncall-platform | tier-1 |
| API Gateway Instance 1 | platform-team@example.com | #oncall-platform | tier-1 |
| API Gateway Instance 2 | platform-team@example.com | #oncall-platform | tier-1 |
| Order Service | platform-team@example.com | #oncall-orders | tier-1 |
| Inventory Service | platform-team@example.com | #oncall-inventory | tier-2 |
| Payment Service | platform-team@example.com | #oncall-payments | tier-1 |

## Database Contacts

| Database | DBA Contact | Backup Schedule | Restore Time |
|----------|-------------|-----------------|--------------|
| Order Database Primary | dba-team@example.com | 0 2 * * * | &lt; 30 minutes |
| Order Database Replica | dba-team@example.com | 0 3 * * * | &lt; 30 minutes |
| Inventory Database | dba-team@example.com | 0 2 * * * | &lt; 30 minutes |

## Critical Flows & Business Impact

### Customer Order Processing

- **Business Impact:** Customers cannot complete purchases - direct revenue loss
- **SLA:** 99.9% availability, 30s p99 latency
- **Degraded Behavior:** Orders queue in message broker; processed when service recovers
- **Customer Communication:** Display &#x27;Order processing delayed&#x27; message

---

### Inventory Stock Check

- **Business Impact:** Stock levels may be inaccurate - risk of overselling
- **SLA:** 99.5% availability, 500ms p99 latency
- **Degraded Behavior:** Fall back to cached inventory; flag orders for manual review
- **Customer Communication:** Display &#x27;Stock availability being confirmed&#x27;

---


## Monitoring Links

| Resource | Link |
|----------|------|
| Grafana Dashboard | https://grafana.example.com/d/ecommerce-overview |
| Kibana Logs | https://kibana.example.com/app/discover#/ecommerce-* |
| PagerDuty | https://pagerduty.example.com/services/ECOMMERCE |
| Status Page | https://status.example.com |
