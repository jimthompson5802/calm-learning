# calm-hub-cli CLI

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
calm-hub-cli namespaces list
calm-hub-cli namespaces create --name finos --description "FINOS namespace"
calm-hub-cli namespaces create --file ./namespace.json
calm-hub-cli domains list
calm-hub-cli domains create --name security
calm-hub-cli adrs list --namespace finos
calm-hub-cli adrs create --namespace finos --file ./adr.json
calm-hub-cli decorators list --namespace finos --type deployment
calm-hub-cli controls list --domain security
calm-hub-cli controls create --domain security --file ./control-requirement.json

calm-hub-cli architectures list --namespace finos
calm-hub-cli architectures create --namespace finos --file ./architecture.json
calm-hub-cli architectures versions --namespace finos --id 12
calm-hub-cli architectures get --namespace finos --id 12 --version 1.0.0
calm-hub-cli architectures create-version --namespace finos --id 12 --version 1.0.1 --file ./architecture.json

calm-hub-cli patterns list --namespace finos
calm-hub-cli interfaces list --namespace finos
calm-hub-cli standards list --namespace finos
calm-hub-cli flows list --namespace finos
calm-hub-cli flows get --namespace finos --id 12
calm-hub-cli flows get-version --namespace finos --id 12 --version 1.0.0
```

After building, the package also exposes the `calm-hub-cli` executable through the package `bin` entry.

## Using The Executable

From [`utilities/`](./), you can link the package into your global npm environment so `calm-hub-cli` is available on your `PATH`:

```bash
npm install
npm run build
npm link
which calm-hub-cli
calm-hub-cli namespaces list
```

If you later want to remove the global link, run:

```bash
npm unlink -g calm-learning-utilities
```

If you prefer not to link it globally, you can also run it with `npx` from inside `utilities`:

```bash
npx calm-hub-cli namespaces list
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
node dist/index.js domains create --name security
node dist/index.js adrs create --namespace finos --file ./fixtures/adr.json
node dist/index.js decorators create --namespace finos --file ./fixtures/decorator.json
node dist/index.js controls create --domain security --file ./fixtures/control-requirement.json
node dist/index.js controls requirement-create-version --domain security --id 5 --version 1.0.1 --file ./fixtures/control-requirement-version.json
node dist/index.js controls configuration-create --domain security --id 5 --file ./fixtures/control-configuration.json
node dist/index.js controls configuration-create-version --domain security --id 5 --config-id 2 --version 1.0.1 --file ./fixtures/control-configuration-version.json
node dist/index.js architectures create --namespace finos --file ./fixtures/architecture.calm.json
node dist/index.js patterns create --namespace finos --file ./fixtures/pattern.calm.json
node dist/index.js interfaces create --namespace finos --file ./fixtures/interface.calm.json
node dist/index.js standards create --namespace finos --file ./fixtures/standard.calm.json
node dist/index.js flows create --namespace finos --file ./fixtures/flow.calm.json
```
