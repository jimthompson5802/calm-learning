# Service Runbooks

Generated from architecture: {{metadata.name}}

---

{{#each nodes}}
{{#if (eq node-type "service")}}
## {{name}}

**Unique ID:** `{{unique-id}}`

### Ownership

| Field | Value |
|-------|-------|
| Owner | {{metadata.owner}} |
| On-Call Slack | {{metadata.oncall-slack}} |
| Tier | {{metadata.tier}} |
| Runbook | {{metadata.runbook}} |

### Health & Monitoring

- **Health Endpoint:** `{{metadata.health-endpoint}}`
- **Dashboard:** {{metadata.dashboard}}

### Known Failure Modes

{{#if metadata.failure-modes}}
{{#each metadata.failure-modes}}
#### {{symptom}}

| Aspect | Details |
|--------|---------|
| **Likely Cause** | {{likely-cause}} |
| **How to Check** | {{check}} |
| **Remediation** | {{remediation}} |
| **Escalation** | {{escalation}} |

{{/each}}
{{else}}
No failure modes documented yet.
{{/if}}

---

{{/if}}
{{/each}}
