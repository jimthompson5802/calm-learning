---
architecture: ../architectures/ecommerce-platform.json
---
# Relationship Details: E-commerce order processing platform

### customer-uses-platform


**Type:** Interaction

- **Actor:** `customer`
- **Interacts with:** `api-gateway`


---
### admin-uses-platform


**Type:** Interaction

- **Actor:** `admin`
- **Interacts with:** `api-gateway`


---
### api-gateway-to-order-service

**Type:** Connection

| Property | Value |
|----------|-------|
| Source | `api-gateway` |
| Destination | `order-service` |
| Source Interfaces | `api-gateway-https` |



---
### api-gateway-to-inventory-service

**Type:** Connection

| Property | Value |
|----------|-------|
| Source | `api-gateway` |
| Destination | `inventory-service` |
| Source Interfaces | `api-gateway-https` |



---
### order-service-to-payment-service

**Type:** Connection

| Property | Value |
|----------|-------|
| Source | `order-service` |
| Destination | `payment-service` |
| Source Interfaces | `order-service-http` |



---
### order-service-to-order-db

**Type:** Connection

| Property | Value |
|----------|-------|
| Source | `order-service` |
| Destination | `order-database` |
| Source Interfaces | `order-service-http` |



---
### inventory-service-to-inventory-db

**Type:** Connection

| Property | Value |
|----------|-------|
| Source | `inventory-service` |
| Destination | `inventory-database` |
| Source Interfaces | `inventory-service-http` |



---
### ecommerce-platform-composed-of-services



**Type:** Composition

- **Container:** `ecommerce-platform`
- **Contains:** `api-gateway`, `order-service`, `inventory-service`, `payment-service`, `order-database`, `inventory-database`

---
