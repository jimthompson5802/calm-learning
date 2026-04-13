---
architecture: ../architectures/ecommerce-platform.json
---
# {{metadata.description}} - Combined Documentation

## Architecture Overview (widget)
{{block-architecture this}}

## Services Summary (custom Handlebars)
{{#each nodes}}
{{#if (eq node-type "service")}}
### {{name}}
- **ID:** `{{unique-id}}`
- **Description:** {{description}}
{{/if}}
{{/each}}

## All Nodes (widget)
{{table nodes columns="unique-id,name,node-type"}}