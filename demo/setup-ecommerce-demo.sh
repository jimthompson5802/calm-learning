#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

if ! command -v calm-hub >/dev/null 2>&1; then
  echo "Error: calm-hub is not available on PATH." >&2
  exit 1
fi

echo
echo "Next: list namespaces"
calm-hub namespaces list

echo
echo "Next: create namespace ecommerce"
calm-hub namespaces create \
  --name "ecommerce" \
  --description "Ecommerce demo"

echo
echo "Next: list namespaces"
calm-hub namespaces list

echo
echo "Next: create architecture ecommerce-platform in namespace ecommerce"
calm-hub architectures create \
  --namespace "ecommerce" \
  --file "$REPO_ROOT/architectures/ecommerce-platform.json"

echo
echo "Next: create pattern Company Base Pattern in namespace ecommerce"
calm-hub patterns create \
  --namespace "ecommerce" \
  --file "$REPO_ROOT/patterns/company-base-pattern.json" \
  --name "Company Base Pattern" \
  --description "A base pattern enforcing organisational standards on all CALM architectures. Every node must comply with the Company Node Standard (cost center, owner, environment) and every relationship must comply with the Company Relationship Standard (data classification, encrypted)."

echo
echo "Next: create standard Company Node Standard in namespace ecommerce"
calm-hub standards create \
  --namespace "ecommerce" \
  --file "$REPO_ROOT/standards/company-node-standard.json" \
  --name "Company Node Standard" \
  --description "Defines required node metadata including cost center, owner, and environment constraints for CALM nodes."

echo
echo "Next: create standard Company Relationship Standard in namespace ecommerce"
calm-hub standards create \
  --namespace "ecommerce" \
  --file "$REPO_ROOT/standards/company-relationship-standard.json" \
  --name "Company Relationship Standard" \
  --description "Defines required relationship metadata including data classification and encryption requirements for CALM relationships."

echo
echo "Next: list architectures in namespace ecommerce"
calm-hub architectures list --namespace "ecommerce"

echo
echo "Next: list patterns in namespace ecommerce"
calm-hub patterns list --namespace "ecommerce"

echo
echo "Next: list standards in namespace ecommerce"
calm-hub standards list --namespace "ecommerce"
