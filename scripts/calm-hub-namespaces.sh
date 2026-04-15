#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib.sh"

usage() {
  cat <<EOF
Usage: $0 <command> [options]

Commands:
  list                     List namespaces
  create --file FILE       Create namespace from JSON file

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
    while [[ $# -gt 0 ]]; do
      case "$1" in
        --file) file="$2"; shift 2;;
        *) usage;;
      esac
    done
    [[ -n "$file" ]] || usage
    request_json POST /calm/namespaces "$file"
    ;;
  *)
    usage
    ;;
esac
