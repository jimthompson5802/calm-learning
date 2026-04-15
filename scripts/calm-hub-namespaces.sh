#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib.sh"

usage() {
  cat <<'EOF'
Usage: $0 <command> [options]

Commands:
  list
    List namespaces

  create --file FILE
    Create namespace from JSON file.

  create --name NAME --description DESCRIPTION
    Create namespace by specifying `--name` and `--description`.
    Must provide both `--name` and `--description`. Cannot be combined with `--file`.

Examples:
  $0 list
  $0 create --file examples/namespace.json
  $0 create --name "my-ns" --description "My namespace description"
EOF
  exit 1
}

cmd=${1:-}
case "$cmd" in
  list)
    request_json GET /calm/namespaces
    ;;
  create)
    shift || true
    file=""
    name=""
    description=""

    while [[ $# -gt 0 ]]; do
      case "$1" in
        --file)
          file="$2"; shift 2;;
        --name)
          name="$2"; shift 2;;
        --description)
          description="$2"; shift 2;;
        *) usage;;
      esac
    done

    # Enforce mutual exclusivity
    if [[ -n "$file" ]]; then
      if [[ -n "$name" || -n "$description" ]]; then
        echo "Error: --file cannot be combined with --name/--description" >&2
        usage
      fi
      if [[ ! -f "$file" ]]; then
        echo "Data file not found: $file" >&2
        exit 4
      fi
      datafile="$file"
    else
      # No file provided; require both name and description
      if [[ -z "$name" || -z "$description" ]]; then
        echo "Error: when not using --file you must provide --name and --description" >&2
        usage
      fi

      tmpf=$(mktemp)
      trap 'rm -f "$tmpf"' EXIT

      if command -v jq >/dev/null 2>&1; then
        jq -n --arg name "$name" --arg description "$description" '{name:$name,description:$description}' > "$tmpf"
      elif command -v python3 >/dev/null 2>&1; then
        python3 -c "import json,sys; print(json.dumps({'name':sys.argv[1],'description':sys.argv[2]}))" "$name" "$description" > "$tmpf"
      else
        # Fallback: basic escaping for common cases
        printf '{"name":"%s","description":"%s"}' \
          "$(printf '%s' "$name" | sed 's/\\/\\\\/g; s/"/\\"/g')" \
          "$(printf '%s' "$description" | sed 's/\\/\\\\/g; s/"/\\"/g')" > "$tmpf"
      fi

      datafile="$tmpf"
    fi

    request_json POST /calm/namespaces "$datafile"
    ;;
  *)
    usage
    ;;
esac
