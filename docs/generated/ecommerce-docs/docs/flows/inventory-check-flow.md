---
architecture: ../../../../../architectures/ecommerce-platform.json
flow-id: inventory-check-flow
id: "inventory-check-flow"
title: "Inventory Stock Check"
---

# Inventory Stock Check

## Details
<div class="table-container">
    <table>
        <tbody>
        <tr>
            <th>Unique Id</th>
            <td>inventory-check-flow</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>Inventory Stock Check</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>Admin checks and updates inventory stock levels</td>
        </tr>
        </tbody>
    </table>
</div>

## Sequence Diagram
```mermaid
sequenceDiagram
    Admin ->> API Gateway: Admin requests inventory status
    API Gateway ->> Inventory Service: Route to inventory service
    Inventory Service ->> Inventory Database: Query current stock levels
    Inventory Database -->> Inventory Service: Return stock data
    Inventory Service -->> API Gateway: Return inventory report
```



## Controls
_No controls defined._

## Metadata
<p class="empty-message">No metadata defined.</p>
