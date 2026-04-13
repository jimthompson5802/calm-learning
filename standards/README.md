# CALM Standards

## What Are Standards?

Standards are [JSON Schema 2020-12](https://json-schema.org/draft/2020-12/schema) documents that extend core CALM components with organisation-specific or domain-specific requirements. They enable consistent, enforceable rules across all CALM architectures while integrating seamlessly with standard JSON Schema validation tools.

### How Standards Extend CALM with `allOf` Composition

Standards use the JSON Schema `allOf` keyword to compose with a core CALM schema definition. This means a conforming document must satisfy **both** the base CALM schema and the additional constraints defined by the Standard.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "My Standard",
  "allOf": [
    { "$ref": "https://calm.finos.org/release/1.2/meta/core.json#/defs/node" },
    {
      "type": "object",
      "properties": { ... },
      "required": [...]
    }
  ]
}
```

The first entry in `allOf` references the canonical CALM core schema (node, relationship, interface, etc.), so all base CALM required properties are automatically inherited. The second entry adds the company-specific properties and requirements on top.

Standards can be used in architectures by composing them into node or relationship definitions:

```json
{
  "defs": {
    "company-node": {
      "allOf": [
        { "$ref": "https://calm.finos.org/release/1.2/meta/core.json#/defs/node" },
        { "$ref": "https://company.com/standards/company-node-standard.json" }
      ]
    }
  }
}
```

---

## Company Node Standard

**File:** [`company-node-standard.json`](company-node-standard.json)  
**Extends:** `https://calm.finos.org/release/1.2/meta/core.json#/defs/node`

Every node in a company architecture must satisfy the base CALM node requirements (`unique-id`, `node-type`, `name`, `description`) plus the following:

| Property | Type | Required | Constraint | Description |
|---|---|---|---|---|
| `costCenter` | `string` | **Yes** | Pattern `^CC-[0-9]{4}$` | Company cost center code responsible for billing (e.g., `CC-1234`). |
| `owner` | `string` | **Yes** | — | The team or individual responsible for this node (e.g., `Platform Engineering`). |
| `environment` | `string` | No | Enum: `development`, `staging`, `production` | The deployment environment this node belongs to. |

### Example

```json
{
  "unique-id": "payments-api",
  "node-type": "service",
  "name": "Payments API",
  "description": "Handles all inbound payment requests.",
  "costCenter": "CC-4821",
  "owner": "Payments Team",
  "environment": "production"
}
```

---

## Company Relationship Standard

**File:** [`company-relationship-standard.json`](company-relationship-standard.json)  
**Extends:** `https://calm.finos.org/release/1.2/meta/core.json#/defs/relationship`

Every relationship in a company architecture must satisfy the base CALM relationship requirements plus the following:

| Property | Type | Required | Constraint | Description |
|---|---|---|---|---|
| `dataClassification` | `string` | **Yes** | Enum: `public`, `internal`, `confidential`, `restricted` | The sensitivity classification of data flowing across this relationship. |
| `encrypted` | `boolean` | **Yes** | — | Whether the connection is encrypted in transit (e.g., via TLS). |

### Example

```json
{
  "unique-id": "payments-api-to-db",
  "relationship-type": {
    "connects": {
      "source": { "node": "payments-api" },
      "destination": { "node": "payments-db" }
    }
  },
  "dataClassification": "restricted",
  "encrypted": true
}
```

---

## Validation

Standards are enforced automatically by `calm validate`. To validate an architecture that references a locally hosted Standard, use the `--url-to-local-file-mapping` option:

```bash
# url-mapping.json
{
  "https://company.com/standards/company-node-standard.json": "standards/company-node-standard.json",
  "https://company.com/standards/company-relationship-standard.json": "standards/company-relationship-standard.json"
}

calm validate -a architectures/my-system.architecture.json -u url-mapping.json
```
