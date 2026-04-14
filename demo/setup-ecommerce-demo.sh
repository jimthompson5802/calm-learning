#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if ! command -v calm-hub >/dev/null 2>&1; then
  echo "Error: calm-hub is not available on PATH." >&2
  exit 1
fi

calm-hub namespaces list

calm-hub namespaces create \
  --name "ecommerce" \
  --description "Ecommerce demo"

calm-hub namespaces list

calm-hub architectures create \
  --namespace "ecommerce" \
  --file "$REPO_ROOT/architectures/ecommerce-platform.json"

calm-hub patterns create \
  --namespace "ecommerce" \
  --file "$REPO_ROOT/patterns/company-base-pattern.json" \
  --name "Company Base Pattern" \
  --description "A base pattern enforcing organisational standards on all CALM architectures. Every node must comply with the Company Node Standard (cost center, owner, environment) and every relationship must comply with the Company Relationship Standard (data classification, encrypted)."

calm-hub standards create \
  --namespace "ecommerce" \
  --file "$REPO_ROOT/standards/company-node-standard.json" \
  --name "Company Node Standard" \
  --description "Defines required node metadata including cost center, owner, and environment constraints for CALM nodes."

calm-hub standards create \
  --namespace "ecommerce" \
  --file "$REPO_ROOT/standards/company-relationship-standard.json" \
  --name "Company Relationship Standard" \
  --description "Defines required relationship metadata including data classification and encryption requirements for CALM relationships."

calm-hub architectures list --namespace "ecommerce"

calm-hub patterns list --namespace "ecommerce"

calm-hub standards list --namespace "ecommerce"
