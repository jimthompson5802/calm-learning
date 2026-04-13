---
architecture: ../../../../../architectures/ecommerce-platform.json
relationship-id: api-gateway-to-order-service
id: "api-gateway-to-order-service"
title: "Api Gateway To Order Service"
---

# Api Gateway To Order Service

## Details
<div class="table-container">
    <table>
        <tbody>
        <tr>
            <th>Unique Id</th>
            <td>api-gateway-to-order-service</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>Routes order-related requests to</td>
        </tr>
        <tr>
            <th>Protocol</th>
            <td>HTTPS</td>
        </tr>
        </tbody>
    </table>
</div>

## Related Nodes
```mermaid
graph TD;
api-gateway -- Connects --> order-service;
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
            <td>&lt; 200ms p99</td>
        </tr>
        <tr>
            <th>Monitoring</th>
            <td>true</td>
        </tr>
        </tbody>
    </table>
</div>
