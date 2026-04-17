# CALM Hub Bash/Curl Cheat Sheet

This cheat sheet shows practical `bash` + `curl` examples for working with CALM Hub from the terminal.

## Assumptions

- CALM Hub is running at `http://localhost:8080`
- Requests use JSON
- If auth is enabled, set `TOKEN` and send a bearer token

```bash
export HUB=http://localhost:8080
export TOKEN=""
```

If auth is required, use:

```bash
AUTH=(-H "Authorization: Bearer $TOKEN")
```

If auth is not required, you can omit `AUTH`.

## Namespaces And Domains

Create a namespace:

```bash
curl -X POST "$HUB/calm/namespaces" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "demo",
    "description": "Demo namespace"
  }'
```

List namespaces:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces"
```

Create a domain:

```bash
curl -X POST "$HUB/calm/domains" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "security"
  }'
```

List domains:

```bash
curl "${AUTH[@]}" "$HUB/calm/domains"
```

## Architectures

List architectures in a namespace:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/architectures"
```

Create an architecture:

```bash
curl -X POST "$HUB/calm/namespaces/demo/architectures" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @architecture-request.json
```

Get architecture versions:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/architectures/1/versions"
```

Get a specific architecture version:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/architectures/1/versions/1.0.0"
```

Create a new architecture version:

```bash
curl -X POST "$HUB/calm/namespaces/demo/architectures/1/versions/1.1.0" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @architecture.json
```

Update an existing architecture version:

```bash
curl -X PUT "$HUB/calm/namespaces/demo/architectures/1/versions/1.1.0" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @architecture.json
```

## Patterns

List patterns:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/patterns"
```

Create a pattern:

```bash
curl -X POST "$HUB/calm/namespaces/demo/patterns" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @pattern-request.json
```

Get pattern versions:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/patterns/1/versions"
```

Get a specific pattern version:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/patterns/1/versions/1.0.0"
```

Create a new pattern version:

```bash
curl -X POST "$HUB/calm/namespaces/demo/patterns/1/versions/1.1.0" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @pattern.json
```

Update a pattern version:

```bash
curl -X PUT "$HUB/calm/namespaces/demo/patterns/1/versions/1.1.0" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @pattern.json
```

## Flows

List flows:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/flows"
```

Create a flow:

```bash
curl -X POST "$HUB/calm/namespaces/demo/flows" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @flow-request.json
```

Get latest flow:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/flows/1"
```

Get flow versions:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/flows/1/versions"
```

Get a specific flow version:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/flows/1/versions/1.0.0"
```

Create a new flow version:

```bash
curl -X POST "$HUB/calm/namespaces/demo/flows/1/versions/1.1.0" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @flow.json
```

Update a flow version:

```bash
curl -X PUT "$HUB/calm/namespaces/demo/flows/1/versions/1.1.0" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @flow.json
```

## Standards And Interfaces

List standards:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/standards"
```

List interfaces:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/interfaces"
```

Get interface version:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/interfaces/1/versions/1.0.0"
```

## ADRs

List ADRs:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/adrs"
```

Create an ADR:

```bash
curl -X POST "$HUB/calm/namespaces/demo/adrs" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @adr-request.json
```

Get latest ADR revision:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/adrs/1"
```

List ADR revisions:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/adrs/1/revisions"
```

Get a specific ADR revision:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/adrs/1/revisions/2"
```

Create a new ADR revision:

```bash
curl -X POST "$HUB/calm/namespaces/demo/adrs/1" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @adr-request.json
```

Update ADR status:

```bash
curl -X POST "$HUB/calm/namespaces/demo/adrs/1/status/APPROVED" \
  "${AUTH[@]}"
```

## Controls

List controls for a domain:

```bash
curl "${AUTH[@]}" "$HUB/calm/domains/security/controls"
```

Create a control requirement:

```bash
curl -X POST "$HUB/calm/domains/security/controls" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @control-requirement-request.json
```

List requirement versions:

```bash
curl "${AUTH[@]}" "$HUB/calm/domains/security/controls/1/requirement/versions"
```

Get a requirement version:

```bash
curl "${AUTH[@]}" "$HUB/calm/domains/security/controls/1/requirement/versions/1.0.0"
```

Create a requirement version:

```bash
curl -X POST "$HUB/calm/domains/security/controls/1/requirement/versions/1.1.0" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @requirement.json
```

List control configurations:

```bash
curl "${AUTH[@]}" "$HUB/calm/domains/security/controls/1/configurations"
```

Create a configuration:

```bash
curl -X POST "$HUB/calm/domains/security/controls/1/configurations" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @control-config-request.json
```

Get configuration versions:

```bash
curl "${AUTH[@]}" "$HUB/calm/domains/security/controls/1/configurations/1/versions"
```

Get a configuration version:

```bash
curl "${AUTH[@]}" "$HUB/calm/domains/security/controls/1/configurations/1/versions/1.0.0"
```

Create a configuration version:

```bash
curl -X POST "$HUB/calm/domains/security/controls/1/configurations/1/versions/1.1.0" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @configuration.json
```

## Front Controller By Custom ID

Create or update by slug:

```bash
curl -X POST "$HUB/calm/namespaces/demo/my-architecture" \
  "${AUTH[@]}" \
  -H "Content-Type: application/json" \
  -d @front-controller-create.json
```

Get latest by slug:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/my-architecture"
```

Get versions by slug:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/my-architecture/versions"
```

Get specific version by slug:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/my-architecture/versions/1.0.0"
```

List mappings:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/mappings"
```

Filter mappings by type and numeric ID:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/mappings?type=ARCHITECTURE&id=1"
```

## Useful Tips

Pretty-print with `jq`:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces" | jq
```

Save a response to a file:

```bash
curl "${AUTH[@]}" "$HUB/calm/namespaces/demo/architectures/1/versions/1.0.0" | jq . > sandbox/architecture-1.0.0.json
```

Show response headers and status:

```bash
curl -i "${AUTH[@]}" "$HUB/calm/namespaces"
```

## Notes

- CALM Hub currently appears to support create, read, and update operations through the exposed endpoints.
- I did not find a `DELETE` endpoint in the current resource layer, so this is not full CRUD yet.
