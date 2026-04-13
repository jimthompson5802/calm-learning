---
architecture: ../../../../../architectures/ecommerce-platform.json
node-id: inventory-database
id: "inventory-database"
title: "Inventory Database"
---

# Inventory Database

## Details
<div class="table-container">
    <table>
        <tbody>
        <tr>
            <th>Unique Id</th>
            <td>inventory-database</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>Inventory Database</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>Persistent store for product catalogue, stock quantities, warehouse locations, and reservation records</td>
        </tr>
        <tr>
            <th>Node Type</th>
            <td>database</td>
        </tr>
        </tbody>
    </table>
</div>

## Interfaces
<div class="table-container">
    <table>
        <thead>
        <tr>
            <th>Unique Id</th>
            <th>Host</th>
            <th>Port</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>inventory-db-connection</td>
            <td>inventory-db.internal</td>
            <td>5432</td>
        </tr>
        </tbody>
    </table>
</div>

## Related Nodes
```mermaid
graph TD;
inventory-database[inventory-database]:::highlight;
inventory-service -- Connects --> inventory-database;
ecommerce-platform -- Composed Of --> inventory-database;
classDef highlight fill:#f2bbae;
```

## Controls
_No controls defined._

## Metadata
<div class="table-container">
    <table>
        <thead>
        <tr>
            <th>Key</th>
            <th>Value</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th>Owner</th>
            <td>platform-team@example.com</td>
        </tr>
        <tr>
            <th>Repository</th>
            <td>https://github.com/example-org/inventory-service</td>
        </tr>
        <tr>
            <th>Deployment Type</th>
            <td>managed</td>
        </tr>
        <tr>
            <th>Engine</th>
            <td>PostgreSQL 15</td>
        </tr>
        </tbody>
    </table>
</div>
