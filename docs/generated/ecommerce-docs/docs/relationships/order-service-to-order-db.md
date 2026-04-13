---
architecture: ../../../../../architectures/ecommerce-platform.json
relationship-id: order-service-to-order-db
id: "order-service-to-order-db"
title: "Order Service To Order Db"
---

# Order Service To Order Db

## Details
<div class="table-container">
    <table>
        <tbody>
        <tr>
            <th>Unique Id</th>
            <td>order-service-to-order-db</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>Reads and writes order records to</td>
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
order-service -- Connects --> order-database;
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
        <tr>
            <th>Circuit Breaker</th>
            <td>true</td>
        </tr>
        </tbody>
    </table>
</div>
