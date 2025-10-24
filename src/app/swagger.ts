import { OpenAPIV3 } from 'openapi-types';

const swaggerJsDoc: OpenAPIV3.Document = {
    openapi: '3.0.0',
    info: {
        title: 'Clean Architecture Demo API',
        version: '1.0.0',
        description: 'A comprehensive demo API showcasing Clean Architecture principles with User, Order, and Payment management',
        contact: {
            name: 'API Support'
        }
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server'
        }
    ],
    tags: [
        {
            name: 'Authentication',
            description: 'Authentication endpoints'
        },
        {
            name: 'Users',
            description: 'User management endpoints'
        },
        {
            name: 'Orders',
            description: 'Order management endpoints'
        },
        {
            name: 'Payments',
            description: 'Payment management endpoints'
        }
    ],
    paths: {
        '/users/login': {
            post: {
                tags: ['Authentication'],
                summary: 'Login user',
                description: 'Authenticates a user with email and password, returns a JWT token',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string', format: 'email', description: 'User email' },
                                    password: { type: 'string', description: 'User password (minimum 6 characters)' }
                                },
                                required: ['email', 'password']
                            },
                            example: {
                                email: 'john@example.com',
                                password: 'password123'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Login successful, returns JWT token',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        token: { type: 'string', description: 'JWT token for authentication' },
                                        user: { $ref: '#/components/schemas/User' }
                                    }
                                },
                                example: {
                                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                    user: {
                                        id: '550e8400-e29b-41d4-a716-446655440000',
                                        name: 'John Doe',
                                        email: 'john@example.com',
                                        createdAt: '2025-10-23T10:30:00.000Z'
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Validation failed or invalid credentials',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ValidationError' }
                            }
                        }
                    }
                }
            }
        },
        '/users': {
            post: {
                tags: ['Users'],
                summary: 'Create a new user',
                description: 'Creates a new user with the provided name, email, and optional password',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CreateUserRequest'
                            },
                            example: {
                                name: 'John Doe',
                                email: 'john@example.com',
                                password: 'password123'
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'User created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User'
                                },
                                example: {
                                    id: '550e8400-e29b-41d4-a716-446655440000',
                                    name: 'John Doe',
                                    email: 'john@example.com',
                                    createdAt: '2025-10-23T10:30:00.000Z'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Validation failed - missing or invalid fields',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ValidationError'
                                }
                            }
                        }
                    }
                }
            },
            get: {
                tags: ['Users'],
                summary: 'List all users',
                description: 'Retrieves a list of all users in the system. Requires JWT authentication.',
                security: [{ BearerAuth: [] }],
                responses: {
                    '200': {
                        description: 'List of users retrieved successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/User'
                                    }
                                },
                                example: [
                                    {
                                        id: '550e8400-e29b-41d4-a716-446655440000',
                                        name: 'John Doe',
                                        email: 'john@example.com',
                                        createdAt: '2025-10-23T10:30:00.000Z'
                                    },
                                    {
                                        id: '550e8400-e29b-41d4-a716-446655440001',
                                        name: 'Jane Smith',
                                        email: 'jane@example.com',
                                        createdAt: '2025-10-23T11:00:00.000Z'
                                    }
                                ]
                            }
                        }
                    },
                    '401': {
                        description: 'Unauthorized - no or invalid JWT token',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    }
                }
            }
        },
        '/users/{id}': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'The unique identifier of the user',
                    schema: {
                        type: 'string',
                        format: 'uuid'
                    }
                }
            ],
            get: {
                tags: ['Users'],
                summary: 'Get a user by ID',
                description: 'Retrieves a specific user by their ID',
                responses: {
                    '200': {
                        description: 'User found and returned successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User'
                                },
                                example: {
                                    id: '550e8400-e29b-41d4-a716-446655440000',
                                    name: 'John Doe',
                                    email: 'john@example.com',
                                    createdAt: '2025-10-23T10:30:00.000Z'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'User not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['Users'],
                summary: 'Update a user',
                description: 'Updates an existing user with new name and/or email. Requires JWT authentication.',
                security: [{ BearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UpdateUserRequest'
                            },
                            example: {
                                name: 'John Updated',
                                email: 'john.updated@example.com'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'User updated successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User'
                                },
                                example: {
                                    id: '550e8400-e29b-41d4-a716-446655440000',
                                    name: 'John Updated',
                                    email: 'john.updated@example.com',
                                    createdAt: '2025-10-23T10:30:00.000Z'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Validation failed - invalid input',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ValidationError' }
                            }
                        }
                    },
                    '401': {
                        description: 'Unauthorized - no or invalid JWT token',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    },
                    '404': {
                        description: 'User not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ['Users'],
                summary: 'Delete a user',
                description: 'Deletes a user from the system. Requires JWT authentication.',
                security: [{ BearerAuth: [] }],
                responses: {
                    '204': {
                        description: 'User deleted successfully'
                    },
                    '401': {
                        description: 'Unauthorized - no or invalid JWT token',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    },
                    '404': {
                        description: 'User not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' }
                            }
                        }
                    }
                }
            }
        },
        '/orders': {
            post: {
                tags: ['Orders'],
                summary: 'Create a new order',
                description: 'Creates a new order with items and calculates total',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CreateOrderRequest'
                            },
                            example: {
                                items: [
                                    {
                                        name: 'Product A',
                                        quantity: 2,
                                        price: 29.99
                                    },
                                    {
                                        name: 'Product B',
                                        quantity: 1,
                                        price: 49.99
                                    }
                                ]
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Order created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                },
                                example: {
                                    id: '550e8400-e29b-41d4-a716-446655440010',
                                    items: [
                                        {
                                            name: 'Product A',
                                            quantity: 2,
                                            price: 29.99
                                        },
                                        {
                                            name: 'Product B',
                                            quantity: 1,
                                            price: 49.99
                                        }
                                    ],
                                    total: 109.97,
                                    createdAt: '2025-10-23T12:00:00.000Z'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Invalid order data',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            },
            get: {
                tags: ['Orders'],
                summary: 'List all orders',
                description: 'Retrieves a list of all orders in the system',
                responses: {
                    '200': {
                        description: 'List of orders retrieved successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Order'
                                    }
                                },
                                example: [
                                    {
                                        id: '550e8400-e29b-41d4-a716-446655440010',
                                        items: [
                                            {
                                                name: 'Product A',
                                                quantity: 2,
                                                price: 29.99
                                            }
                                        ],
                                        total: 59.98,
                                        createdAt: '2025-10-23T12:00:00.000Z'
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        },
        '/orders/{id}': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'The unique identifier of the order',
                    schema: {
                        type: 'string',
                        format: 'uuid'
                    }
                }
            ],
            get: {
                tags: ['Orders'],
                summary: 'Get an order by ID',
                description: 'Retrieves a specific order by its ID',
                responses: {
                    '200': {
                        description: 'Order found and returned successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Order'
                                },
                                example: {
                                    id: '550e8400-e29b-41d4-a716-446655440010',
                                    items: [
                                        {
                                            name: 'Product A',
                                            quantity: 2,
                                            price: 29.99
                                        }
                                    ],
                                    total: 59.98,
                                    createdAt: '2025-10-23T12:00:00.000Z'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Order not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/payments': {
            post: {
                tags: ['Payments'],
                summary: 'Create a new payment',
                description: 'Creates a new payment for an order with the specified amount',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CreatePaymentRequest'
                            },
                            example: {
                                orderId: '550e8400-e29b-41d4-a716-446655440010',
                                amount: 109.97
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Payment created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Payment'
                                },
                                example: {
                                    id: '550e8400-e29b-41d4-a716-446655440020',
                                    orderId: '550e8400-e29b-41d4-a716-446655440010',
                                    amount: 109.97,
                                    status: 'pending',
                                    createdAt: '2025-10-23T12:30:00.000Z'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Invalid payment data or order not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            },
            get: {
                tags: ['Payments'],
                summary: 'List all payments',
                description: 'Retrieves a list of all payments in the system',
                responses: {
                    '200': {
                        description: 'List of payments retrieved successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Payment'
                                    }
                                },
                                example: [
                                    {
                                        id: '550e8400-e29b-41d4-a716-446655440020',
                                        orderId: '550e8400-e29b-41d4-a716-446655440010',
                                        amount: 109.97,
                                        status: 'pending',
                                        createdAt: '2025-10-23T12:30:00.000Z'
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        },
        '/payments/{id}': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'The unique identifier of the payment',
                    schema: {
                        type: 'string',
                        format: 'uuid'
                    }
                }
            ],
            get: {
                tags: ['Payments'],
                summary: 'Get a payment by ID',
                description: 'Retrieves a specific payment by its ID',
                responses: {
                    '200': {
                        description: 'Payment found and returned successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Payment'
                                },
                                example: {
                                    id: '550e8400-e29b-41d4-a716-446655440020',
                                    orderId: '550e8400-e29b-41d4-a716-446655440010',
                                    amount: 109.97,
                                    status: 'pending',
                                    createdAt: '2025-10-23T12:30:00.000Z'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Payment not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['Payments'],
                summary: 'Update a payment',
                description: 'Updates a payment status (e.g., from pending to completed)',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/UpdatePaymentRequest'
                            },
                            example: {
                                status: 'completed'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Payment updated successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Payment'
                                },
                                example: {
                                    id: '550e8400-e29b-41d4-a716-446655440020',
                                    orderId: '550e8400-e29b-41d4-a716-446655440010',
                                    amount: 109.97,
                                    status: 'completed',
                                    createdAt: '2025-10-23T12:30:00.000Z'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Payment not found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Error'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            User: {
                type: 'object',
                description: 'Represents a user in the system',
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                        description: 'Unique identifier for the user'
                    },
                    name: {
                        type: 'string',
                        description: 'Full name of the user',
                        minLength: 1,
                        maxLength: 255
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'Email address of the user',
                        minLength: 1,
                        maxLength: 255
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'ISO 8601 timestamp when the user was created'
                    }
                },
                required: ['id', 'name', 'email', 'createdAt']
            },
            CreateUserRequest: {
                type: 'object',
                description: 'Request body for creating a new user',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Full name of the user',
                        minLength: 1,
                        maxLength: 255
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'Email address of the user',
                        minLength: 1,
                        maxLength: 255
                    },
                    password: {
                        type: 'string',
                        description: 'Password for the user (optional, minimum 6 characters)',
                        minLength: 6
                    }
                },
                required: ['name', 'email']
            },
            UpdateUserRequest: {
                type: 'object',
                description: 'Request body for updating a user',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Full name of the user',
                        minLength: 1,
                        maxLength: 255
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'Email address of the user',
                        minLength: 1,
                        maxLength: 255
                    }
                }
            },
            Order: {
                type: 'object',
                description: 'Represents an order in the system',
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                        description: 'Unique identifier for the order'
                    },
                    items: {
                        type: 'array',
                        description: 'List of items in the order',
                        items: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    description: 'Name of the item'
                                },
                                quantity: {
                                    type: 'number',
                                    description: 'Quantity of the item',
                                    minimum: 1
                                },
                                price: {
                                    type: 'number',
                                    description: 'Price per unit',
                                    minimum: 0
                                }
                            },
                            required: ['name', 'quantity', 'price']
                        }
                    },
                    total: {
                        type: 'number',
                        description: 'Total amount of the order',
                        minimum: 0
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'ISO 8601 timestamp when the order was created'
                    }
                },
                required: ['id', 'items', 'total', 'createdAt']
            },
            CreateOrderRequest: {
                type: 'object',
                description: 'Request body for creating a new order',
                properties: {
                    items: {
                        type: 'array',
                        description: 'List of items to include in the order',
                        minItems: 1,
                        items: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    description: 'Name of the item'
                                },
                                quantity: {
                                    type: 'number',
                                    description: 'Quantity of the item',
                                    minimum: 1
                                },
                                price: {
                                    type: 'number',
                                    description: 'Price per unit',
                                    minimum: 0
                                }
                            },
                            required: ['name', 'quantity', 'price']
                        }
                    }
                },
                required: ['items']
            },
            Payment: {
                type: 'object',
                description: 'Represents a payment for an order',
                properties: {
                    id: {
                        type: 'string',
                        format: 'uuid',
                        description: 'Unique identifier for the payment'
                    },
                    orderId: {
                        type: 'string',
                        format: 'uuid',
                        description: 'ID of the associated order'
                    },
                    amount: {
                        type: 'number',
                        description: 'Payment amount',
                        minimum: 0
                    },
                    status: {
                        type: 'string',
                        enum: ['pending', 'completed', 'failed', 'cancelled'],
                        description: 'Current status of the payment'
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'ISO 8601 timestamp when the payment was created'
                    }
                },
                required: ['id', 'orderId', 'amount', 'status', 'createdAt']
            },
            CreatePaymentRequest: {
                type: 'object',
                description: 'Request body for creating a new payment',
                properties: {
                    orderId: {
                        type: 'string',
                        format: 'uuid',
                        description: 'ID of the order for which to create a payment'
                    },
                    amount: {
                        type: 'number',
                        description: 'Payment amount',
                        minimum: 0
                    }
                },
                required: ['orderId', 'amount']
            },
            UpdatePaymentRequest: {
                type: 'object',
                description: 'Request body for updating a payment',
                properties: {
                    status: {
                        type: 'string',
                        enum: ['pending', 'completed', 'failed', 'cancelled'],
                        description: 'New status for the payment'
                    }
                }
            },
            Error: {
                type: 'object',
                description: 'Standard error response',
                properties: {
                    message: {
                        type: 'string',
                        description: 'Error message describing what went wrong'
                    },
                    code: {
                        type: 'string',
                        description: 'Error code for programmatic handling'
                    },
                    status: {
                        type: 'number',
                        description: 'HTTP status code'
                    }
                },
                required: ['message']
            },
            ValidationError: {
                type: 'object',
                description: 'Validation error response',
                properties: {
                    message: {
                        type: 'string',
                        description: 'Validation error message'
                    },
                    errors: {
                        type: 'object',
                        description: 'Detailed validation errors'
                    }
                },
                required: ['message']
            }
        },
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
};

export default swaggerJsDoc;
