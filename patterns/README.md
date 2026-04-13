# CALM Patterns

## Multi-Pattern Validation

CALM architectures are validated against **multiple patterns simultaneously** — each pattern enforcing a distinct concern. This workspace uses two complementary pattern types: **structural patterns** and **standards patterns**.

### Structural Patterns

Structural patterns define *what* an architecture looks like: which nodes must exist, what types they are, how they connect, and what choices are available. They use `prefixItems`, `const`, `minItems`, and `maxItems` to pin the shape of the architecture.

**Example:** `web-app-pattern.json` requires exactly three nodes (`web-frontend`, `api-service`, `app-database`) connected by two specific relationships.

### Standards Patterns

Standards patterns define *how* every element must be annotated, regardless of what the architecture contains. They use `items` (not `prefixItems`) to apply a schema rule to every entry in an array, without constraining count or position.

**Example:** `company-base-pattern.json` requires every node to carry `costCenter` and `owner`, and every relationship to carry `dataClassification` and `encrypted`.

---

## Why Separate Patterns Are Better Than Combined Patterns

| Concern | Structural Pattern | Standards Pattern |
|---|---|---|
| Node identity & topology | ✅ | ❌ |
| Organisational metadata | ❌ | ✅ |
| Reusability across teams | Specific to architecture type | **Universal — applies to all** |
| Change surface | Topology changes only | Policy changes only |

Combining both concerns into a single pattern creates tight coupling: a topology change forces a review of policy constraints, and a policy change forces re-validation of structural rules. Keeping them separate means:

- **Structural patterns** can evolve independently as architecture templates change (e.g., adding a cache layer).
- **Standards patterns** update in one place when company policy changes (e.g., adding a new required field), and every architecture automatically picks up the new requirement.
- **Teams** can compose any structural pattern with the standards pattern without duplication.

---

## Enabling CI/CD Governance

Running multiple patterns in validation allows CI/CD pipelines to enforce governance at multiple levels in a single step:

```bash
# Validate structural conformance
calm validate -p patterns/web-app-pattern.json \
              -a architectures/generated-webapp.json

# Validate standards conformance
calm validate -p patterns/company-base-pattern.json \
              -a architectures/generated-webapp.json \
              -u url-mapping.json
```

Both checks can be required as mandatory gates on pull requests, meaning:

1. **No architecture merges** unless it matches its structural pattern (correct nodes, relationships, topology).
2. **No architecture merges** unless every node and relationship carries valid company metadata.

This separates the concerns of *architecture review* (structural) and *policy compliance* (standards) into independent, composable gates — making it easy to add new policy checks without touching structural validation, and vice versa.

---

## Current Patterns

### `web-app-pattern.json` — Structural

| Property | Value |
|---|---|
| `$id` | `https://example.com/patterns/web-app-pattern.json` |
| Schema | CALM 1.2 |
| Purpose | Defines the 3-tier web application topology |

**Enforces:**
- Exactly 3 nodes: `web-frontend` (webclient), `api-service` (service), `app-database` (database)
- Exactly 2 relationships: `frontend-to-api` and `api-to-database`
- Node descriptions are user-supplied (not fixed)

---

### `company-base-pattern.json` — Standards

| Property | Value |
|---|---|
| `$id` | `https://example.com/patterns/company-base-pattern.json` |
| Schema | CALM 1.1 |
| Purpose | Enforces organisational metadata on all nodes and relationships |

**Enforces (on every node):**
- `costCenter` — billing code matching `^CC-[0-9]{4}$` *(required)*
- `owner` — responsible team or individual *(required)*
- `environment` — one of `development`, `staging`, `production` *(optional)*

**Enforces (on every relationship):**
- `dataClassification` — one of `public`, `internal`, `confidential`, `restricted` *(required)*
- `encrypted` — boolean indicating in-transit encryption *(required)*

See [standards/README.md](../standards/README.md) for full standard definitions.
