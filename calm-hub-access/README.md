# CALM Hub — curl examples

This document provides ready-to-run `curl` commands for common CALM Hub endpoints (namespaces, architectures, standards, controls, patterns, domains, and ADRs).

Base URL (edit as needed): http://localhost:8080

Note: Quarkus exposes Swagger/OpenAPI UI (if enabled) at `/q/swagger-ui` for exploring endpoints and models.

---

## GET /calm/namespaces
List available namespaces.

```bash
curl -X GET "http://localhost:8080/calm/namespaces" \
  -H "Accept: application/json"
```

## POST /calm/namespaces
Create a new namespace.

```bash
curl -X POST "http://localhost:8080/calm/namespaces" \
  -H "Content-Type: application/json" \
  -d '{"name": "my-namespace", "description": "Optional description"}'
```

## GET /calm/namespaces/{namespace}/architectures
List architectures in a namespace.

```bash
curl -X GET "http://localhost:8080/calm/namespaces/{namespace}/architectures" \
  -H "Accept: application/json"
```

## POST /calm/namespaces/{namespace}/architectures
Create an architecture in a namespace (payload read from a file).

```bash
curl -X POST "http://localhost:8080/calm/namespaces/{namespace}/architectures" \
  -H "Content-Type: application/json" \
  --data-binary @path/to/architecture.json
```

Example: use a file from this repo, e.g. `architectures/my-first-architecture.json` or `generated-webapp.json` under the `architectures/` folder.

## GET /calm/namespaces/{namespace}/architectures/{architectureId}/versions
List versions for an architecture.

```bash
curl -X GET "http://localhost:8080/calm/namespaces/{namespace}/architectures/{architectureId}/versions" \
  -H "Accept: application/json"
```

## GET /calm/namespaces/{namespace}/architectures/{architectureId}/versions/{version}
Get a specific architecture version.

```bash
curl -X GET "http://localhost:8080/calm/namespaces/{namespace}/architectures/{architectureId}/versions/{version}" \
  -H "Accept: application/json"
```

## POST /calm/namespaces/{namespace}/architectures/{architectureId}/versions/{version}
Create a versioned architecture (raw or typed payload depending on API).

```bash
curl -X POST "http://localhost:8080/calm/namespaces/{namespace}/architectures/{architectureId}/versions/{version}" \
  -H "Content-Type: application/json" \
  -d '{ /* versioned architecture JSON */ }'
```

---

## GET /calm/namespaces/{namespace}/patterns
List patterns in a namespace.

```bash
curl -X GET "http://localhost:8080/calm/namespaces/{namespace}/patterns" \
  -H "Accept: application/json"
```

## POST /calm/namespaces/{namespace}/patterns
Create a pattern (payload read from a file).

```bash
curl -X POST "http://localhost:8080/calm/namespaces/{namespace}/patterns" \
  -H "Content-Type: application/json" \
  --data-binary @path/to/pattern.json
```

Example: use a file from this repo, e.g. `patterns/web-app-pattern.json` or `patterns/company-base-pattern.json` under the `patterns/` folder.

## GET /calm/namespaces/{namespace}/patterns/{patternId}/versions
List pattern versions.

```bash
curl -X GET "http://localhost:8080/calm/namespaces/{namespace}/patterns/{patternId}/versions" \
  -H "Accept: application/json"
```

## GET /calm/namespaces/{namespace}/patterns/{patternId}/versions/{version}
Get a specific pattern version.

```bash
curl -X GET "http://localhost:8080/calm/namespaces/{namespace}/patterns/{patternId}/versions/{version}" \
  -H "Accept: application/json"
```

## POST /calm/namespaces/{namespace}/patterns/{patternId}/versions/{version}
Create or upload a version of a pattern (payload read from a file).

```bash
curl -X POST "http://localhost:8080/calm/namespaces/{namespace}/patterns/{patternId}/versions/{version}" \
  -H "Content-Type: application/json" \
  --data-binary @path/to/pattern.json
```

Example: source the version payload from `patterns/<file>.json` in this repo.

---

## GET /calm/namespaces/{namespace}/standards
List standards in a namespace.

```bash
curl -X GET "http://localhost:8080/calm/namespaces/{namespace}/standards" \
  -H "Accept: application/json"
```

## POST /calm/namespaces/{namespace}/standards
Create a standard (payload read from a file).

```bash
curl -X POST "http://localhost:8080/calm/namespaces/{namespace}/standards" \
  -H "Content-Type: application/json" \
  --data-binary @path/to/standard.json
```

Example: use a file from this repo, e.g. `standards/company-node-standard.json` or `standards/company-relationship-standard.json` under the `standards/` folder.

## GET /calm/namespaces/{namespace}/standards/{standardId}/versions
List versions of a standard.

```bash
curl -X GET "http://localhost:8080/calm/namespaces/{namespace}/standards/{standardId}/versions" \
  -H "Accept: application/json"
```

## GET /calm/namespaces/{namespace}/standards/{standardId}/versions/{version}
Get a specific standard version.

```bash
curl -X GET "http://localhost:8080/calm/namespaces/{namespace}/standards/{standardId}/versions/{version}" \
  -H "Accept: application/json"
```

## POST /calm/namespaces/{namespace}/standards/{standardId}/versions/{version}
Create a new version of a standard (payload read from a file).

```bash
curl -X POST "http://localhost:8080/calm/namespaces/{namespace}/standards/{standardId}/versions/{version}" \
  -H "Content-Type: application/json" \
  --data-binary @path/to/standard-version.json
```

Example: source the version payload from `standards/<file>.json` in this repo.

---

## GET /calm/domains
List domains.

```bash
curl -X GET "http://localhost:8080/calm/domains" \
  -H "Accept: application/json"
```

## POST /calm/domains
Create a domain.

```bash
curl -X POST "http://localhost:8080/calm/domains" \
  -H "Content-Type: application/json" \
  -d '{"id": "my-domain", "title": "Domain title", "description": "Optional"}'
```

## GET /calm/domains/{domain}/controls
List controls for a domain.

```bash
curl -X GET "http://localhost:8080/calm/domains/{domain}/controls" \
  -H "Accept: application/json"
```

## POST /calm/domains/{domain}/controls
Create a control requirement for a domain.

```bash
curl -X POST "http://localhost:8080/calm/domains/{domain}/controls" \
  -H "Content-Type: application/json" \
  --data-binary @path/to/control.json
```

Example: use a file from this repo, e.g. `controls/ctrl-1-requirement.json` under a `controls/` folder.

## GET /calm/domains/{domain}/controls/{controlId}/requirement/versions
List requirement versions for a control.

```bash
curl -X GET "http://localhost:8080/calm/domains/{domain}/controls/{controlId}/requirement/versions" \
  -H "Accept: application/json"
```

## GET /calm/domains/{domain}/controls/{controlId}/requirement/versions/{version}
Get a specific requirement version.

```bash
curl -X GET "http://localhost:8080/calm/domains/{domain}/controls/{controlId}/requirement/versions/{version}" \
  -H "Accept: application/json"
```

## POST /calm/domains/{domain}/controls/{controlId}/configurations
Create a configuration for a control.

```bash
curl -X POST "http://localhost:8080/calm/domains/{domain}/controls/{controlId}/configurations" \
  -H "Content-Type: application/json" \
  --data-binary @path/to/configuration.json
```

Example: use `controls/<controlId>-config.json` in the repo as the payload file.

---

## GET /calm/namespaces/{namespace}/adrs
List ADRs in a namespace.

```bash
curl -X GET "http://localhost:8080/calm/namespaces/{namespace}/adrs" \
  -H "Accept: application/json"
```

## POST /calm/namespaces/{namespace}/adrs
Create a new ADR (payload read from a file).

```bash
curl -X POST "http://localhost:8080/calm/namespaces/{namespace}/adrs" \
  -H "Content-Type: application/json" \
  --data-binary @path/to/adr.json
```

Example: use a file from this repo, e.g. `adrs/adr-1.json` under an `adrs/` folder.

## GET /calm/namespaces/{namespace}/adrs/{adrId}/revisions
List ADR revisions.

```bash
curl -X GET "http://localhost:8080/calm/namespaces/{namespace}/adrs/{adrId}/revisions" \
  -H "Accept: application/json"
```

## GET /calm/namespaces/{namespace}/adrs/{adrId}/revisions/{revision}
Get a specific ADR revision.

```bash
curl -X GET "http://localhost:8080/calm/namespaces/{namespace}/adrs/{adrId}/revisions/{revision}" \
  -H "Accept: application/json"
```

## POST /calm/namespaces/{namespace}/adrs/{adrId}/status/{status}
Update ADR status (e.g., `DRAFT`, `ACCEPTED`, `REJECTED`).

```bash
curl -X POST "http://localhost:8080/calm/namespaces/{namespace}/adrs/{adrId}/status/{status}" \
  -H "Accept: application/json"
```

---

If you want me to:
- replace placeholders with concrete examples from `calm-learning`,
- add authentication headers (Bearer/Basic), or
- include additional endpoints from the hub,

tell me which and I'll update the README.
