module.exports = {
    docs: [
        {
            type: 'doc',
            id: 'index',
            label: 'Home',
        },
        {
            type: 'category',
            label: 'Nodes',
            items: [
                'nodes/customer',
                'nodes/admin',
                'nodes/api-gateway',
                'nodes/order-service',
                'nodes/inventory-service',
                'nodes/payment-service',
                'nodes/order-database',
                'nodes/inventory-database',
                'nodes/ecommerce-platform'
            ],
        },
        {
            type: 'category',
            label: 'Relationships',
            items: [
                'relationships/customer-uses-platform',
                'relationships/admin-uses-platform',
                'relationships/api-gateway-to-order-service',
                'relationships/api-gateway-to-inventory-service',
                'relationships/order-service-to-payment-service',
                'relationships/order-service-to-order-db',
                'relationships/inventory-service-to-inventory-db',
                'relationships/ecommerce-platform-composed-of-services'
            ],
        },
        {
            type: 'category',
            label: 'Flows',
            items: [
                'flows/order-processing-flow',
                'flows/inventory-check-flow'
            ],
        },
    ],
};

