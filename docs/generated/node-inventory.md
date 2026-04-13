---
architecture: ../architectures/ecommerce-platform.json
---
# Node Inventory: E-commerce order processing platform

| Name | Type | ID | Description |
|------|------|-------|-------------|
| Customer | Actor | `customer` | End user who browses the store, places orders, and tracks order status through the e-commerce platform |
| Admin | Actor | `admin` | Internal platform administrator who manages inventory, reviews orders, and configures platform settings |
| API Gateway | Service | `api-gateway` | Single entry point for all client requests; handles routing, authentication, rate limiting, and load balancing across downstream services |
| Order Service | Service | `order-service` | Manages the full order lifecycle: creation, status tracking, fulfilment coordination with inventory, and payment initiation |
| Inventory Service | Service | `inventory-service` | Tracks stock levels, reserves items during order processing, and triggers restocking alerts when thresholds are breached |
| Payment Service | Service | `payment-service` | Processes payment authorisations, captures, and refunds via downstream payment gateways; enforces PCI-DSS compliance |
| Order Database | Database | `order-database` | Primary relational store for order records, order line items, and order status history |
| Inventory Database | Database | `inventory-database` | Persistent store for product catalogue, stock quantities, warehouse locations, and reservation records |
| E-Commerce Platform | System | `ecommerce-platform` | Top-level system boundary encompassing all services and data stores that together deliver the e-commerce order processing capability |

## Services Only

- **API Gateway** (`api-gateway`): Single entry point for all client requests; handles routing, authentication, rate limiting, and load balancing across downstream services
- **Order Service** (`order-service`): Manages the full order lifecycle: creation, status tracking, fulfilment coordination with inventory, and payment initiation
- **Inventory Service** (`inventory-service`): Tracks stock levels, reserves items during order processing, and triggers restocking alerts when thresholds are breached
- **Payment Service** (`payment-service`): Processes payment authorisations, captures, and refunds via downstream payment gateways; enforces PCI-DSS compliance

## Databases Only

- **Order Database** (`order-database`): Primary relational store for order records, order line items, and order status history
- **Inventory Database** (`inventory-database`): Persistent store for product catalogue, stock quantities, warehouse locations, and reservation records

## Actors

- **Customer**: End user who browses the store, places orders, and tracks order status through the e-commerce platform
- **Admin**: Internal platform administrator who manages inventory, reviews orders, and configures platform settings
