---
architecture: ../../../../../architectures/ecommerce-platform.json
node-id: customer
id: "customer"
title: "Customer"
---

# Customer

## Details
<div class="table-container">
    <table>
        <tbody>
        <tr>
            <th>Unique Id</th>
            <td>customer</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>Customer</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>End user who browses the store, places orders, and tracks order status through the e-commerce platform</td>
        </tr>
        <tr>
            <th>Node Type</th>
            <td>actor</td>
        </tr>
        </tbody>
    </table>
</div>

## Interfaces
<p class="empty-message">No interfaces defined.</p>

## Related Nodes
```mermaid
graph TD;
customer[customer]:::highlight;
customer -- Interacts --> api-gateway;
classDef highlight fill:#f2bbae;
```

## Controls
_No controls defined._

## Metadata
<p class="empty-message">No metadata defined.</p>
