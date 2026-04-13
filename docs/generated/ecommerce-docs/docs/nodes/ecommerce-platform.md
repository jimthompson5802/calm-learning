---
architecture: ../../../../../architectures/ecommerce-platform.json
node-id: ecommerce-platform
id: "ecommerce-platform"
title: "E-Commerce Platform"
---

# E-Commerce Platform

## Details
<div class="table-container">
    <table>
        <tbody>
        <tr>
            <th>Unique Id</th>
            <td>ecommerce-platform</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>E-Commerce Platform</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>Top-level system boundary encompassing all services and data stores that together deliver the e-commerce order processing capability</td>
        </tr>
        <tr>
            <th>Node Type</th>
            <td>system</td>
        </tr>
        </tbody>
    </table>
</div>

## Interfaces
<p class="empty-message">No interfaces defined.</p>

## Related Nodes
```mermaid
graph TD;
ecommerce-platform[ecommerce-platform]:::highlight;
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
            <td>https://github.com/example-org/ecommerce-platform</td>
        </tr>
        <tr>
            <th>Deployment Type</th>
            <td>cloud</td>
        </tr>
        <tr>
            <th>Environment</th>
            <td>production</td>
        </tr>
        </tbody>
    </table>
</div>
