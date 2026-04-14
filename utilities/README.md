# calm-hub CLI

This directory contains a standalone TypeScript CLI for issuing requests to a local `calm-hub` server.

## Default target

Unless overridden, the CLI targets:

```bash
http://localhost:8080
```

## Build

```bash
npm install
npm run build
npm test
```

## Usage

```bash
node dist/index.js namespaces list
node dist/index.js namespaces create --name finos --description "FINOS namespace"
node dist/index.js namespaces create --file ./namespace.json

node dist/index.js architectures list --namespace finos
node dist/index.js architectures create --namespace finos --file ./architecture.json
node dist/index.js architectures versions --namespace finos --id 12
node dist/index.js architectures get --namespace finos --id 12 --version 1.0.0
node dist/index.js architectures create-version --namespace finos --id 12 --version 1.0.1 --file ./architecture.json

node dist/index.js patterns list --namespace finos
node dist/index.js interfaces list --namespace finos
node dist/index.js standards list --namespace finos
node dist/index.js flows list --namespace finos
node dist/index.js flows get --namespace finos --id 12
node dist/index.js flows get-version --namespace finos --id 12 --version 1.0.0
```

After building, the package also exposes the `calm-hub` executable through the package `bin` entry.

## Using The Executable

From [`utilities/`](./), you can make the `calm-hub` command available in your shell:

```bash
npm link
calm-hub namespaces list
```

If you prefer not to link it globally, you can also run it with `npx` from inside `utilities`:

```bash
npx calm-hub namespaces list
```

You can always fall back to the built file directly:

```bash
node dist/index.js namespaces list
```

## Output

The CLI always writes responses to stdout. To also save the rendered response:

```bash
node dist/index.js namespaces list --out namespaces.json
```

Create commands now return a clearer success payload that includes the action, request path, HTTP status, and `Location` header when the server responds with `201 Created`.

## File formats

Namespace create files must contain:

```json
{
  "name": "finos",
  "description": "FINOS namespace"
}
```

You can also create a namespace directly from flags:

```bash
node dist/index.js namespaces create --name finos --description "FINOS namespace"
```

Architecture create files can use either of these shapes.

Wrapped server payload:

```json
{
  "name": "Trading Platform",
  "description": "Core architecture",
  "architectureJson": "{ \"unique-id\": \"trading-platform\" }"
}
```

Plain CALM JSON:

```json
{
  "$schema": "https://calm.finos.org/release/1.2/meta/calm.json",
  "unique-id": "trading-platform",
  "name": "Trading Platform",
  "description": "Core architecture"
}
```

When a plain CALM JSON file is used, the CLI automatically reads the top-level `name` and `description` fields and stringifies the full document into the `architectureJson` field expected by `calm-hub`.

## Fixtures

Example payloads live in [`fixtures/`](./fixtures):

```bash
node dist/index.js namespaces create --file ./fixtures/namespace.json
node dist/index.js namespaces create --name finos --description "FINOS namespace"
node dist/index.js architectures create --namespace finos --file ./fixtures/architecture.calm.json
node dist/index.js patterns create --namespace finos --file ./fixtures/pattern.calm.json
node dist/index.js interfaces create --namespace finos --file ./fixtures/interface.calm.json
node dist/index.js standards create --namespace finos --file ./fixtures/standard.calm.json
node dist/index.js flows create --namespace finos --file ./fixtures/flow.calm.json
```
