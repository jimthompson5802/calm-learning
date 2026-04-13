---
architecture: ../../../../../architectures/ecommerce-platform.json
relationship-id: inventory-service-to-inventory-db
id: "inventory-service-to-inventory-db"
title: "Inventory Service To Inventory Db"
---

# Inventory Service To Inventory Db

## Details
<div class="table-container">
    <table>
        <tbody>
        <tr>
            <th>Unique Id</th>
            <td>inventory-service-to-inventory-db</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>Reads and writes stock and product records to</td>
        </tr>
        <tr>
            <th>Protocol</th>
            <td>JDBC</td>
        </tr>
        </tbody>
    </table>
</div>

## Related Nodes
```mermaid
graph TD;
inventory-service -- Connects --> inventory-database;
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
            <th>Latency Sla</th>
            <td>&lt; 100ms p99</td>
        </tr>
        <tr>
            <th>Monitoring</th>
            <td>true</td>
        </tr>
        </tbody>
    </table>
</div>
