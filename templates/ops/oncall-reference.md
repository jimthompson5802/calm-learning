# On-Call Quick Reference

**Architecture:** {{metadata.name}}

## Service Contacts

| Service | Owner | On-Call Channel | Tier |
|---------|-------|-----------------|------|
{{#each nodes}}
{{#if (eq node-type "service")}}
| {{name}} | {{metadata.owner}} | {{metadata.oncall-slack}} | {{metadata.tier}} |
{{/if}}
{{/each}}

## Database Contacts

| Database | DBA Contact | Backup Schedule | Restore Time |
|----------|-------------|-----------------|--------------|
{{#each nodes}}
{{#if (eq node-type "database")}}
| {{name}} | {{metadata.dba-contact}} | {{metadata.backup-schedule}} | {{metadata.restore-time}} |
{{/if}}
{{/each}}

## Critical Flows & Business Impact

{{#each flows}}
### {{name}}

- **Business Impact:** {{metadata.business-impact}}
- **SLA:** {{metadata.sla}}
- **Degraded Behavior:** {{metadata.degraded-behavior}}
- **Customer Communication:** {{metadata.customer-communication}}

---

{{/each}}

## Monitoring Links

{{#if metadata.monitoring}}
| Resource | Link |
|----------|------|
| Grafana Dashboard | {{metadata.monitoring.grafana-dashboard}} |
| Kibana Logs | {{metadata.monitoring.kibana-logs}} |
| PagerDuty | {{metadata.monitoring.pagerduty-service}} |
| Status Page | {{metadata.monitoring.statuspage}} |
{{/if}}
