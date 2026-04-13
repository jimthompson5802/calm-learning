---
architecture: ../../../../architectures/ecommerce-platform.json
id: index
title: Welcome to CALM Documentation
sidebar_position: 1
slug: /
---

# Welcome to CALM Documentation

This documentation is generated from the **CALM Architecture-as-Code** model.

## High Level Architecture
```mermaid
---
config:
  theme: base
  themeVariables:
    fontFamily: -apple-system, BlinkMacSystemFont, 'Segoe WPC', 'Segoe UI', system-ui, 'Ubuntu', sans-serif
    darkMode: false
    fontSize: 14px
    edgeLabelBackground: '#d5d7e1'
    lineColor: '#000000'
---
%%{init: {"layout": "elk", "flowchart": {"htmlLabels": false}}}%%
flowchart TB
classDef boundary fill:#e1e4f0,stroke:#204485,stroke-dasharray: 5 4,stroke-width:1px,color:#000000;
classDef node fill:#eef1ff,stroke:#007dff,stroke-width:1px,color:#000000;
classDef iface fill:#f0f0f0,stroke:#b6b6b6,stroke-width:1px,font-size:10px,color:#000000;
classDef highlight fill:#fdf7ec,stroke:#f0c060,stroke-width:1px,color:#000000;

        subgraph ecommerce-platform["E-Commerce Platform"]
        direction TB
            api-gateway["API Gateway"]:::node
            inventory-database["Inventory Database"]:::node
            inventory-service["Inventory Service"]:::node
            order-database["Order Database"]:::node
            order-service["Order Service"]:::node
            payment-service["Payment Service"]:::node
        end
        class ecommerce-platform boundary

    admin["Admin"]:::node
    customer["Customer"]:::node

    customer -->|Browses products, places orders, and tracks order status through| api-gateway
    admin -->|Manages inventory and reviews order data through| api-gateway
    api-gateway -->|Routes order-related requests to| order-service
    api-gateway -->|Routes inventory and product queries to| inventory-service
    order-service -->|Initiates and confirms payment authorisation with| payment-service
    order-service -->|Reads and writes order records to| order-database
    inventory-service -->|Reads and writes stock and product records to| inventory-database



```

## Nodes
- [Customer](nodes/customer)
- [Admin](nodes/admin)
- [API Gateway](nodes/api-gateway)
- [Order Service](nodes/order-service)
- [Inventory Service](nodes/inventory-service)
- [Payment Service](nodes/payment-service)
- [Order Database](nodes/order-database)
- [Inventory Database](nodes/inventory-database)
- [E-Commerce Platform](nodes/ecommerce-platform)

## Relationships
- [Customer Uses Platform](relationships/customer-uses-platform)
- [Admin Uses Platform](relationships/admin-uses-platform)
- [Api Gateway To Order Service](relationships/api-gateway-to-order-service)
- [Api Gateway To Inventory Service](relationships/api-gateway-to-inventory-service)
- [Order Service To Payment Service](relationships/order-service-to-payment-service)
- [Order Service To Order Db](relationships/order-service-to-order-db)
- [Inventory Service To Inventory Db](relationships/inventory-service-to-inventory-db)
- [Ecommerce Platform Composed Of Services](relationships/ecommerce-platform-composed-of-services)

## Flows
- [Customer Order Processing](flows/order-processing-flow)
- [Inventory Stock Check](flows/inventory-check-flow)

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
            <th>Version</th>
            <td>1.0.0</td>
        </tr>
        <tr>
            <th>Created</th>
            <td>2026-04-12</td>
        </tr>
        <tr>
            <th>Description</th>
            <td>E-commerce order processing platform</td>
        </tr>
        <tr>
            <th>Tags</th>
            <td>ecommerce, microservices, orders</td>
        </tr>
        </tbody>
    </table>
</div>

## ADRs
- [docs/adr/0001-use-message-queue-for-async-processing.md](docs/adr/0001-use-message-queue-for-async-processing.md)
- [docs/adr/0002-use-oauth2-for-api-authentication.md](docs/adr/0002-use-oauth2-for-api-authentication.md)
