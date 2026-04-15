#!/usr/bin/env bash
set -euo pipefail

# Shared helpers for calm-hub scripts (uses curl + jq)
BASE_URL="${BASE_URL:-http://localhost:8080}"
TIMEOUT_SEC="${TIMEOUT_SEC:-30}"

log() { echo "[calm-scripts]" "$@"; }

request_json() {
  local method=$1 path=$2 datafile=${3:-}
  local curl_opts=( -sS -w "\n%{http_code}" -X "$method" -H "Accept: application/json" -H "Content-Type: application/json" --max-time "$TIMEOUT_SEC" )
  if [[ -n "$datafile" ]]; then
    if [[ ! -f "$datafile" ]]; then
      echo "Data file not found: $datafile" >&2
      return 4
    fi
    curl_opts+=( --data-binary "@$datafile" )
  fi
  curl_opts+=( "$BASE_URL$path" )

  local resp
  if ! resp=$(curl "${curl_opts[@]}" ); then
    echo "curl failed" >&2
    return 2
  fi

  local http_code
  http_code=$(echo "$resp" | tail -n1)
  local body
  body=$(echo "$resp" | sed '$d')

  if command -v jq >/dev/null 2>&1 && [[ -n "$body" ]]; then
    echo "$body" | jq . || echo "$body"
  else
    [[ -n "$body" ]] && echo "$body"
  fi

  # Always print HTTP status to stderr for visibility
  echo "HTTP_STATUS: $http_code" >&2

  if [[ "$http_code" -ge 200 && "$http_code" -lt 300 ]]; then
    return 0
  else
    return 3
  fi
}

stringify_field() {
  # stringify a top-level field if it's an object: stringify_field <input-file> <field> <output-file>
  local infile=$1 field=$2 outfile=$3
  jq "if (.$field|type)==\"object\" then .$field = (.$field|@json) else . end" "$infile" > "$outfile"
}

validate_json_string_field() {
  # validate that a string field contains valid JSON (returns non-zero if invalid)
  local file=$1 field=$2
  jq -e "if (.$field|type)==\"string\" then (.${field}|fromjson) else . end" "$file" >/dev/null
}
