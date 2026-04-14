# Demonstration of CALM HUB Integration

Using results from the `Beginner` and `Intermediate` tutorials, demonstrate using CALM Hub to store the artifacts.

## Demonstration Script
[setup-ecommerce-demo.sh](setup-ecommerce-demo.sh)

## Example Output
```
$ demo/setup-ecommerce-demo.sh 

Next: list namespaces
{
  "values": [
    {
      "name": "finos",
      "description": "FINOS namespace"
    },
    {
      "name": "workshop",
      "description": "Workshop namespace"
    },
    {
      "name": "traderx",
      "description": "TraderX namespace"
    }
  ]
}

Next: create namespace ecommerce
{
  "ok": true,
  "action": "namespaces.create",
  "status": 201,
  "path": "/calm/namespaces",
  "location": "http://localhost:8080/calm/namespaces/ecommerce",
  "data": null
}

Next: list namespaces
{
  "values": [
    {
      "name": "finos",
      "description": "FINOS namespace"
    },
    {
      "name": "workshop",
      "description": "Workshop namespace"
    },
    {
      "name": "traderx",
      "description": "TraderX namespace"
    },
    {
      "name": "ecommerce",
      "description": "Ecommerce demo"
    }
  ]
}

Next: create architecture ecommerce-platform in namespace ecommerce
{
  "ok": true,
  "action": "architectures.create",
  "status": 201,
  "path": "/calm/namespaces/ecommerce/architectures",
  "location": "http://localhost:8080/calm/namespaces/ecommerce/architectures/2/versions/1.0.0",
  "data": null
}

Next: create pattern Company Base Pattern in namespace ecommerce
{
  "ok": true,
  "action": "patterns.create",
  "status": 201,
  "path": "/calm/namespaces/ecommerce/patterns",
  "location": "http://localhost:8080/calm/namespaces/ecommerce/patterns/2/versions/1.0.0",
  "data": null
}

Next: create standard Company Node Standard in namespace ecommerce
{
  "ok": true,
  "action": "standards.create",
  "status": 201,
  "path": "/calm/namespaces/ecommerce/standards",
  "location": "http://localhost:8080/calm/namespaces/ecommerce/standards/2/versions/1.0.0",
  "data": null
}

Next: create standard Company Relationship Standard in namespace ecommerce
{
  "ok": true,
  "action": "standards.create",
  "status": 201,
  "path": "/calm/namespaces/ecommerce/standards",
  "location": "http://localhost:8080/calm/namespaces/ecommerce/standards/3/versions/1.0.0",
  "data": null
}

Next: list architectures in namespace ecommerce
{
  "values": [
    {
      "description": "End-to-end order processing platform for e-commerce, covering order placement, inventory management, and payment processing",
      "id": 2,
      "name": "E-Commerce Order Processing Platform"
    }
  ]
}

Next: list patterns in namespace ecommerce
{
  "values": [
    {
      "description": "A base pattern enforcing organisational standards on all CALM architectures. Every node must comply with the Company Node Standard (cost center, owner, environment) and every relationship must comply with the Company Relationship Standard (data classification, encrypted).",
      "id": 2,
      "name": "Company Base Pattern"
    }
  ]
}

Next: list standards in namespace ecommerce
{
  "values": [
    {
      "description": "Defines required node metadata including cost center, owner, and environment constraints for CALM nodes.",
      "id": 2,
      "name": "Company Node Standard"
    },
    {
      "description": "Defines required relationship metadata including data classification and encryption requirements for CALM relationships.",
      "id": 3,
      "name": "Company Relationship Standard"
    }
  ]
}
```