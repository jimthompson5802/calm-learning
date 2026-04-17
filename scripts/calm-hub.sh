#!/usr/bin/env bash

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  set -euo pipefail
fi

HUB="${HUB:-http://localhost:8080}"
TOKEN="${TOKEN:-}"

curl_json() {
  local method="$1"
  local path="$2"
  shift 2

  local -a args
  args=(-sS -X "$method")

  if [[ -n "$TOKEN" ]]; then
    args+=(-H "Authorization: Bearer $TOKEN")
  fi

  args+=("$@" "$HUB$path")
  curl "${args[@]}"
}

curl_json_body() {
  local method="$1"
  local path="$2"
  local body="$3"
  curl_json "$method" "$path" -H "Content-Type: application/json" -d "$body"
}

curl_json_file() {
  local method="$1"
  local path="$2"
  local file="$3"
  curl_json "$method" "$path" -H "Content-Type: application/json" --data @"$file"
}

hub_namespaces() {
  curl_json GET "/calm/namespaces"
}

hub_create_namespace() {
  local name="$1"
  local description="${2:-$1 namespace}"
  curl_json_body POST "/calm/namespaces" "{\"name\":\"$name\",\"description\":\"$description\"}"
}

hub_domains() {
  curl_json GET "/calm/domains"
}

hub_create_domain() {
  local domain="$1"
  curl_json_body POST "/calm/domains" "{\"name\":\"$domain\"}"
}

hub_list_architectures() {
  local namespace="$1"
  curl_json GET "/calm/namespaces/$namespace/architectures"
}

hub_get_arch_versions() {
  local namespace="$1"
  local arch_id="$2"
  curl_json GET "/calm/namespaces/$namespace/architectures/$arch_id/versions"
}

hub_get_arch() {
  local namespace="$1"
  local arch_id="$2"
  local version="$3"
  curl_json GET "/calm/namespaces/$namespace/architectures/$arch_id/versions/$version"
}

hub_create_arch() {
  local namespace="$1"
  local request_file="$2"
  curl_json_file POST "/calm/namespaces/$namespace/architectures" "$request_file"
}

hub_create_arch_version() {
  local namespace="$1"
  local arch_id="$2"
  local version="$3"
  local json_file="$4"
  curl_json_file POST "/calm/namespaces/$namespace/architectures/$arch_id/versions/$version" "$json_file"
}

hub_update_arch_version() {
  local namespace="$1"
  local arch_id="$2"
  local version="$3"
  local json_file="$4"
  curl_json_file PUT "/calm/namespaces/$namespace/architectures/$arch_id/versions/$version" "$json_file"
}

hub_list_patterns() {
  local namespace="$1"
  curl_json GET "/calm/namespaces/$namespace/patterns"
}

hub_get_pattern() {
  local namespace="$1"
  local pattern_id="$2"
  local version="$3"
  curl_json GET "/calm/namespaces/$namespace/patterns/$pattern_id/versions/$version"
}

hub_list_flows() {
  local namespace="$1"
  curl_json GET "/calm/namespaces/$namespace/flows"
}

hub_get_flow_latest() {
  local namespace="$1"
  local flow_id="$2"
  curl_json GET "/calm/namespaces/$namespace/flows/$flow_id"
}

hub_get_flow() {
  local namespace="$1"
  local flow_id="$2"
  local version="$3"
  curl_json GET "/calm/namespaces/$namespace/flows/$flow_id/versions/$version"
}

hub_list_standards() {
  local namespace="$1"
  curl_json GET "/calm/namespaces/$namespace/standards"
}

hub_list_interfaces() {
  local namespace="$1"
  curl_json GET "/calm/namespaces/$namespace/interfaces"
}

hub_get_interface() {
  local namespace="$1"
  local interface_id="$2"
  local version="$3"
  curl_json GET "/calm/namespaces/$namespace/interfaces/$interface_id/versions/$version"
}

hub_list_adrs() {
  local namespace="$1"
  curl_json GET "/calm/namespaces/$namespace/adrs"
}

hub_get_adr_latest() {
  local namespace="$1"
  local adr_id="$2"
  curl_json GET "/calm/namespaces/$namespace/adrs/$adr_id"
}

hub_get_adr_revision() {
  local namespace="$1"
  local adr_id="$2"
  local revision="$3"
  curl_json GET "/calm/namespaces/$namespace/adrs/$adr_id/revisions/$revision"
}

hub_update_adr_status() {
  local namespace="$1"
  local adr_id="$2"
  local status="$3"
  curl_json POST "/calm/namespaces/$namespace/adrs/$adr_id/status/$status"
}

hub_list_controls() {
  local domain="$1"
  curl_json GET "/calm/domains/$domain/controls"
}

hub_get_control_requirement() {
  local domain="$1"
  local control_id="$2"
  local version="$3"
  curl_json GET "/calm/domains/$domain/controls/$control_id/requirement/versions/$version"
}

hub_get_control_config() {
  local domain="$1"
  local control_id="$2"
  local config_id="$3"
  local version="$4"
  curl_json GET "/calm/domains/$domain/controls/$control_id/configurations/$config_id/versions/$version"
}

hub_get_slug_latest() {
  local namespace="$1"
  local custom_id="$2"
  curl_json GET "/calm/namespaces/$namespace/$custom_id"
}

hub_get_slug_version() {
  local namespace="$1"
  local custom_id="$2"
  local version="$3"
  curl_json GET "/calm/namespaces/$namespace/$custom_id/versions/$version"
}

hub_list_mappings() {
  local namespace="$1"
  curl_json GET "/calm/namespaces/$namespace/mappings"
}

hub_help() {
  cat <<'EOF'
CALM Hub shell helpers

Environment:
  export HUB=http://localhost:8080
  export TOKEN=...   # optional bearer token

Examples:
  source scripts/calm-hub.sh
  hub_namespaces | jq
  hub_create_namespace demo "Demo namespace"
  hub_list_architectures demo | jq
  hub_get_arch demo 1 1.0.0 | jq
  hub_list_flows demo | jq
  hub_list_controls security | jq
  hub_get_slug_latest demo my-architecture | jq
EOF
}
