---
architecture: ../../../../../architectures/ecommerce-platform.json
node-id: order-service
id: "order-service"
title: "Order Service"
---

# Order Service

## Details
<div class="table-container">
    <table>
        <tbody>
        <tr>
            <th>Unique Id</th>
            <td>order-service</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>Order Service</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>Manages the full order lifecycle: creation, status tracking, fulfilment coordination with inventory, and payment initiation</td>
        </tr>
        <tr>
            <th>Node Type</th>
            <td>service</td>
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
            <td>order-service-http</td>
            <td>order-service.internal</td>
            <td>8080</td>
        </tr>
        </tbody>
    </table>
</div>

## Related Nodes
```mermaid
graph TD;
order-service[order-service]:::highlight;
api-gateway -- Connects --> order-service;
order-service -- Connects --> payment-service;
order-service -- Connects --> order-database;
ecommerce-platform -- Composed Of --> order-service;
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
            <td>https://github.com/example-org/order-service</td>
        </tr>
        <tr>
            <th>Deployment Type</th>
            <td>container</td>
        </tr>
        <tr>
            <th>Sla Tier</th>
            <td>tier-1</td>
        </tr>
        </tbody>
    </table>
</div>
