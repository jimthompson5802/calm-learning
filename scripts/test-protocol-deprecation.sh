#!/bin/bash


# Explicitly validate each architecture file with 'protocol' in the name
echo -e "\n\n------------------------------------------------------"
echo "Validation: calm validate -a "$(dirname "$0")/../architectures/test-protocol-no-protocol.architecture.json" -f pretty"
calm validate -a "$(dirname "$0")/../architectures/test-protocol-no-protocol.architecture.json" -f pretty
echo -e "\nExit code: $?"
echo "------------------------------------------------------"

echo -e "\n\n------------------------------------------------------"
echo "Validation: calm validate -a "$(dirname "$0")/../architectures/test-protocol-with-protocol.architecture.json" -f pretty"
calm validate -a "$(dirname "$0")/../architectures/test-protocol-with-protocol.architecture.json" -f pretty
echo -e "\nExit code: $?"
echo "------------------------------------------------------"

echo -e "\n\n------------------------------------------------------"
echo "STRICT Validation: calm validate -a "$(dirname "$0")/../architectures/test-protocol-with-protocol.architecture.json" -f pretty --strict"
calm validate -a "$(dirname "$0")/../architectures/test-protocol-with-protocol.architecture.json" -f pretty --strict    
echo -e "\nExit code: $?"
echo "------------------------------------------------------"


echo -e "\n\n------------------------------------------------------"
echo "Validation: calm validate -a "$(dirname "$0")/../architectures/test-protocol-invalid-protocol.architecture.json" -f pretty"
calm validate -a "$(dirname "$0")/../architectures/test-protocol-invalid-protocol.architecture.json" -f pretty
echo -e "\nExit code: $?"
echo "------------------------------------------------------"
