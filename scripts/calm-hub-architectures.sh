#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib.sh"

usage() {
  cat <<EOF
Usage: $0 <command> [options]

Commands:
  list --namespace NS               List architectures in namespace
  get  --namespace NS --id ID       Get architecture by id
  create --namespace NS --file FILE Create architecture (stringifies architectureJson if object)

EOF
  exit 1
}

cmd=${1:-}
case "$cmd" in
  list)
    shift || true
    ns=""
    while [[ $# -gt 0 ]]; do
      case "$1" in
        --namespace) ns="$2"; shift 2;;
        *) usage;;
      esac
    done
    [[ -n "$ns" ]] || usage
    request_json GET "/calm/namespaces/$ns/architectures"
    ;;
  get)
    shift || true
    ns="" id=""
    while [[ $# -gt 0 ]]; do
      case "$1" in
        --namespace) ns="$2"; shift 2;;
        --id) id="$2"; shift 2;;
        *) usage;;
      esac
    done
    [[ -n "$ns" && -n "$id" ]] || usage
    request_json GET "/calm/namespaces/$ns/architectures/$id"
    ;;
  create)
    shift || true
    ns="" file=""
    while [[ $# -gt 0 ]]; do
      case "$1" in
        --namespace) ns="$2"; shift 2;;
        --file) file="$2"; shift 2;;
        *) usage;;
      esac
    done
    [[ -n "$ns" && -n "$file" ]] || usage
    tmpfile=$(mktemp -t calm-arch-XXXX.json)
    stringify_field "$file" architectureJson "$tmpfile"
    request_json POST "/calm/namespaces/$ns/architectures" "$tmpfile" || rc=$?
    rm -f "$tmpfile"
    if [[ ${rc:-0} -ne 0 ]]; then exit $rc; fi
    ;;
  *)
    usage
    ;;
esac
