---
architecture: ../../../../../architectures/ecommerce-platform.json
relationship-id: ecommerce-platform-composed-of-services
id: "ecommerce-platform-composed-of-services"
title: "Ecommerce Platform Composed Of Services"
---

# Ecommerce Platform Composed Of Services

## Details
<div class="table-container">
    <table>
        <tbody>
        <tr>
            <th>Unique Id</th>
            <td>ecommerce-platform-composed-of-services</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>Composed of all services and data stores that deliver order processing</td>
        </tr>
        </tbody>
    </table>
</div>

## Related Nodes
```mermaid
graph TD;
ecommerce-platform -- Composed Of --> api-gateway;
ecommerce-platform -- Composed Of --> order-service;
ecommerce-platform -- Composed Of --> inventory-service;
ecommerce-platform -- Composed Of --> payment-service;
ecommerce-platform -- Composed Of --> order-database;
ecommerce-platform -- Composed Of --> inventory-database;
classDef highlight fill:#f2bbae;
```

## Controls
_No controls defined._

## Metadata
<p class="empty-message">No metadata defined.</p>
