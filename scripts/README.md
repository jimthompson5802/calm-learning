# calm-learning scripts

Simple shell scripts that interact with the CALM hub HTTP API using only `bash`, `curl`, and `jq`.

Prerequisites:
- `bash` (4+ recommended on macOS)
- `curl`
- `jq`

Examples:

List namespaces:

```bash
chmod +x scripts/lib.sh scripts/calm-hub-namespaces.sh
./scripts/calm-hub-namespaces.sh list
```

Create an architecture (example):

```bash
chmod +x scripts/lib.sh scripts/calm-hub-architectures.sh
./scripts/calm-hub-architectures.sh create --namespace example --file scripts/examples/architecture.json
```

Create a namespace (examples):

Using a JSON file:

```bash
chmod +x scripts/lib.sh scripts/calm-hub-namespaces.sh
./scripts/calm-hub-namespaces.sh create --file scripts/examples/namespace.json
```

Using name and description:

```bash
chmod +x scripts/lib.sh scripts/calm-hub-namespaces.sh
./scripts/calm-hub-namespaces.sh create --name "my-ns" --description "My namespace description"
```

Invalid usages (will show an error):

```bash
# Mixing --file with --name is not allowed
./scripts/calm-hub-namespaces.sh create --file f.json --name x

# Missing --description is not allowed when using --name
./scripts/calm-hub-namespaces.sh create --name x
```

Set API base URL via env var:

```bash
BASE_URL=http://localhost:8080 ./scripts/calm-hub-namespaces.sh list
```
