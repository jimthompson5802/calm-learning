---
architecture: ../../../../../architectures/ecommerce-platform.json
node-id: payment-service
id: "payment-service"
title: "Payment Service"
---

# Payment Service

## Details
<div class="table-container">
    <table>
        <tbody>
        <tr>
            <th>Unique Id</th>
            <td>payment-service</td>
        </tr>
        <tr>
            <th>Name</th>
            <td>Payment Service</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>Processes payment authorisations, captures, and refunds via downstream payment gateways; enforces PCI-DSS compliance</td>
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
            <td>payment-service-https</td>
            <td>payment-service.internal</td>
            <td>8443</td>
        </tr>
        </tbody>
    </table>
</div>

## Related Nodes
```mermaid
graph TD;
payment-service[payment-service]:::highlight;
order-service -- Connects --> payment-service;
ecommerce-platform -- Composed Of --> payment-service;
classDef highlight fill:#f2bbae;
```

## Controls
### Compliance

PCI-DSS compliance for payment processing

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
            <td><b>0</b></td>
            <td>
                <table class="nested-table">
                        <tbody>
                        <tr>
                            <td><b>Requirement Url</b></td>
                            <td>
                                https://www.pcisecuritystandards.org/documents/PCI-DSS-v4.0
                                    </td>
                        </tr>
                        </tbody>
                    </table>
            </td>
        </tr>
        </tbody>
    </table>
</div>


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
            <td>https://github.com/example-org/payment-service</td>
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
