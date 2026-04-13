---
architecture: ../../../../../architectures/ecommerce-platform.json
relationship-id: order-service-to-payment-service
id: "order-service-to-payment-service"
title: "Order Service To Payment Service"
---

# Order Service To Payment Service

## Details
<div class="table-container">
    <table>
        <tbody>
        <tr>
            <th>Unique Id</th>
            <td>order-service-to-payment-service</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>Initiates and confirms payment authorisation with</td>
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
order-service -- Connects --> payment-service;
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
            <td>&lt; 500ms p99</td>
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
