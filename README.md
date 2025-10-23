# Clean Architecture Demo API

A comprehensive demonstration of **Clean Architecture** principles in Node.js with Express.js, featuring a complete API for managing Users, Orders, and Payments.

## Architecture Overview

This project follows the Clean Architecture pattern, which separates concerns into distinct layers:

### Project Structure

```
src/
├── app/                          # Application setup
│   ├── app.js                   # Express app configuration
│   ├── server.js                # Server entry point
│   ├── swagger.js               # Swagger/OpenAPI documentation
│   ├── logger.js                # Winston logging configuration
│   ├── errors/                  # Error handling
│   │   ├── errorHandler.js      # Global error handler
│   │   └── httpError.js         # Custom HTTP error class
│   └── middleware/              # Express middleware
│       └── requestId.js         # Request ID middleware
│
├── domain/                       # Business logic layer (No framework dependencies)
│   ├── entities/                # Business entity definitions
│   │   ├── user.js
│   │   ├── order.js
│   │   └── payment.js
│   └── repositories/            # Repository interfaces (contracts)
│       ├── userRepository.js
│       ├── orderRepository.js
│       └── paymentRepository.js
│
├── usecases/                     # Use case layer (Application-specific business rules)
│   ├── user/
│   │   ├── createUser.js
│   │   ├── getUser.js
│   │   ├── listUsers.js
│   │   ├── updateUser.js
│   │   └── deleteUser.js
│   ├── order/
│   │   ├── createOrder.js
│   │   ├── getOrder.js
│   │   └── listOrders.js
│   └── payment/
│       ├── createPayment.js
│       ├── getPayment.js
│       ├── listPayments.js
│       └── updatePayment.js
│
├── infrastructure/              # Infrastructure layer (Framework-specific implementations)
│   └── repositories/
│       ├── inMemoryUserRepository.js
│       ├── inMemoryOrderRepository.js
│       └── inMemoryPaymentRepository.js
│
└── interfaces/                  # Interface layer (HTTP layer - Controllers & Routes)
    ├── controllers/
    │   ├── userController.js
    │   ├── orderController.js
    │   └── paymentController.js
    └── routes/
        ├── userRoutes.js
        ├── orderRoutes.js
        └── paymentRoutes.js

tests/                           # Test files
├── user.test.js
└── orderPayment.test.js
```

## Key Principles

- **Separation of Concerns**: Each layer has a specific responsibility
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Testability**: Business logic is independent of frameworks
- **Framework Independence**: Core logic doesn't depend on Express, databases, or other frameworks
- **Flexibility**: Easy to swap implementations (e.g., in-memory to database)

## API Endpoints

### Users Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users` | Create a new user |
| GET | `/users` | List all users |
| GET | `/users/:id` | Get user by ID |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

### Orders Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Create a new order |
| GET | `/orders` | List all orders |
| GET | `/orders/:id` | Get order by ID |

### Payments Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payments` | Create a new payment |
| GET | `/payments` | List all payments |
| GET | `/payments/:id` | Get payment by ID |
| PUT | `/payments/:id` | Update payment status |

## Installation

```bash
npm install
```

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `PORT` environment variable)

## API Documentation

### Swagger UI

Once the server is running, access the interactive API documentation at:

📖 **[http://localhost:3000/docs](http://localhost:3000/docs)**

The Swagger UI provides:
- Complete endpoint documentation
- Request/response examples
- Schema definitions for all resources
- Built-in API testing capabilities
- Error response documentation

### OpenAPI Spec

The OpenAPI/Swagger specification is available in JSON format at:

- `/docs-json` - Full OpenAPI specification

## Data Models

### User

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-10-23T10:30:00.000Z"
}
```

### Order

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "items": [
    {
      "name": "Product A",
      "quantity": 2,
      "price": 29.99
    }
  ],
  "total": 59.98,
  "createdAt": "2025-10-23T12:00:00.000Z"
}
```

### Payment

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440020",
  "orderId": "550e8400-e29b-41d4-a716-446655440010",
  "amount": 109.97,
  "status": "pending",
  "createdAt": "2025-10-23T12:30:00.000Z"
}
```

## Example API Requests

### Create a User

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### Create an Order

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "name": "Product A",
        "quantity": 2,
        "price": 29.99
      },
      {
        "name": "Product B",
        "quantity": 1,
        "price": 49.99
      }
    ]
  }'
```

### Create a Payment

```bash
curl -X POST http://localhost:3000/payments \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "550e8400-e29b-41d4-a716-446655440010",
    "amount": 109.97
  }'
```

### Get All Users

```bash
curl http://localhost:3000/users
```

### Update User

```bash
curl -X PUT http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com"
  }'
```

## Testing

Run the test suite:

```bash
npm test
```

## Dependencies

- **express** ^4.18.2 - Web framework
- **swagger-ui-express** ^4.6.3 - Swagger UI integration
- **winston** ^3.9.0 - Logging library
- **uuid** ^9.0.0 - UUID generation

### Dev Dependencies

- **jest** ^29.0.0 - Testing framework
- **supertest** ^6.3.0 - HTTP assertion library
- **nodemon** ^2.0.22 - Development auto-reload

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Best Practices Demonstrated

1. **Layered Architecture**: Clear separation between domain, application, and infrastructure layers
2. **Dependency Injection**: Dependencies are injected rather than created within classes
3. **Error Handling**: Centralized error handling with custom error classes
4. **Logging**: Request tracking with unique request IDs
5. **API Documentation**: Complete Swagger/OpenAPI documentation
6. **Clean Code**: Readable, maintainable code structure
7. **Use Cases**: Encapsulated business logic in use case classes
8. **Repository Pattern**: Abstraction for data access

## License

MIT
