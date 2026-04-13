---
architecture: ../../../../../architectures/ecommerce-platform.json
node-id: admin
id: "admin"
title: "Admin"
---

# Admin

## Details
<div class="table-container">
    <table>
        <tbody>
        <tr>
            <th>Unique Id</th>
            <td>admin</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>Admin</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>Internal platform administrator who manages inventory, reviews orders, and configures platform settings</td>
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
admin[admin]:::highlight;
admin -- Interacts --> api-gateway;
classDef highlight fill:#f2bbae;
```

## Controls
_No controls defined._

## Metadata
<p class="empty-message">No metadata defined.</p>
