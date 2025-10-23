# Swagger/OpenAPI Documentation Guide

## Overview

This project includes comprehensive Swagger/OpenAPI 3.0.0 documentation for all API endpoints. The documentation is automatically generated and served through Swagger UI.

## Accessing the Documentation

### 1. Swagger UI (Interactive)

Once the server is running, visit:
```
http://localhost:3000/docs
```

**Features:**
- 🔍 Browse all endpoints organized by tags
- 📝 View request/response schemas
- 💡 See example requests and responses
- 🧪 Test endpoints directly from the browser
- 📖 Read detailed descriptions

### 2. OpenAPI Specification (JSON)

Get the raw OpenAPI specification:
```
GET http://localhost:3000/docs-json
```

## Documentation Structure

The Swagger documentation is organized into three main sections:

### 1. Users Endpoints

| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|-----------------|
| `/users` | POST | Create a new user | None |
| `/users` | GET | List all users | None |
| `/users/{id}` | GET | Get user by ID | None |
| `/users/{id}` | PUT | Update user | None |
| `/users/{id}` | DELETE | Delete user | None |

#### Example: Create User

**Request:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-10-23T10:30:00.000Z"
}
```

### 2. Orders Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/orders` | POST | Create a new order |
| `/orders` | GET | List all orders |
| `/orders/{id}` | GET | Get order by ID |

#### Example: Create Order

**Request:**
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

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
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
  ],
  "total": 109.97,
  "createdAt": "2025-10-23T12:00:00.000Z"
}
```

### 3. Payments Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/payments` | POST | Create a new payment |
| `/payments` | GET | List all payments |
| `/payments/{id}` | GET | Get payment by ID |
| `/payments/{id}` | PUT | Update payment status |

#### Example: Create Payment

**Request:**
```bash
curl -X POST http://localhost:3000/payments \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "550e8400-e29b-41d4-a716-446655440010",
    "amount": 109.97
  }'
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440020",
  "orderId": "550e8400-e29b-41d4-a716-446655440010",
  "amount": 109.97,
  "status": "pending",
  "createdAt": "2025-10-23T12:30:00.000Z"
}
```

#### Example: Update Payment Status

**Request:**
```bash
curl -X PUT http://localhost:3000/payments/550e8400-e29b-41d4-a716-446655440020 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440020",
  "orderId": "550e8400-e29b-41d4-a716-446655440010",
  "amount": 109.97,
  "status": "completed",
  "createdAt": "2025-10-23T12:30:00.000Z"
}
```

## Schema Definitions

### User Schema

```json
{
  "id": "string (uuid) - Unique identifier",
  "name": "string - Full name (1-255 characters)",
  "email": "string (email) - Email address (1-255 characters)",
  "createdAt": "string (date-time) - ISO 8601 timestamp"
}
```

**Required fields for creation:** `name`, `email`

### Order Schema

```json
{
  "id": "string (uuid) - Unique identifier",
  "items": [
    {
      "name": "string - Item name",
      "quantity": "number - Quantity (minimum 1)",
      "price": "number - Price per unit (minimum 0)"
    }
  ],
  "total": "number - Total order amount (minimum 0)",
  "createdAt": "string (date-time) - ISO 8601 timestamp"
}
```

**Required fields for creation:** `items` (array with at least 1 item)

### Payment Schema

```json
{
  "id": "string (uuid) - Unique identifier",
  "orderId": "string (uuid) - Associated order ID",
  "amount": "number - Payment amount (minimum 0)",
  "status": "string - Status (pending, completed, failed, cancelled)",
  "createdAt": "string (date-time) - ISO 8601 timestamp"
}
```

**Required fields for creation:** `orderId`, `amount`
**Status values:** `pending`, `completed`, `failed`, `cancelled`

## HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET or PUT request |
| 201 | Created | Successful POST request creating a resource |
| 204 | No Content | Successful DELETE request |
| 400 | Bad Request | Invalid request body or missing required fields |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server error |

## Error Responses

All error responses follow this format:

```json
{
  "message": "Error description",
  "code": "ERROR_CODE",
  "status": 400
}
```

Example error responses in Swagger documentation show what errors each endpoint can return.

## Testing with Swagger UI

1. **Navigate to Swagger UI**: `http://localhost:3000/docs`

2. **Find an endpoint**: Look for the endpoint you want to test

3. **Click "Try it out"**: This makes the endpoint interactive

4. **Fill in parameters**: Enter any path parameters or request body

5. **Click "Execute"**: Send the request

6. **View response**: See the status code and response body

## Using the Documentation for Development

### For API Consumers

- Check the "Schemas" section for exact data structure
- Look at examples to understand request/response format
- Test endpoints in Swagger UI before integrating
- Review error codes to handle failures properly

### For Backend Developers

- All endpoint documentation is in `src/app/swagger.js`
- Update Swagger docs whenever you add/modify endpoints
- Add meaningful descriptions and examples
- Include all error responses

## Documentation File Location

The Swagger configuration file is located at:
```
src/app/swagger.js
```

This file defines:
- API title, version, and description
- Server information
- All paths and endpoints
- Request/response schemas
- Error definitions
- Examples and descriptions

## Best Practices for Swagger Documentation

1. **Keep it up-to-date**: Update Swagger docs when API changes
2. **Provide examples**: Include real-world request/response examples
3. **Document errors**: List all possible error responses
4. **Describe parameters**: Explain what each parameter does
5. **Use proper types**: Use correct data types and formats
6. **Add constraints**: Include min/max values, regex patterns, etc.
7. **Use tags**: Organize endpoints by tags for better navigation
8. **Add descriptions**: Provide clear descriptions for endpoints and parameters

## Troubleshooting

### Swagger UI not loading

1. Ensure server is running: `npm run dev` or `npm start`
2. Check that port 3000 is accessible
3. Verify swagger-ui-express is installed: `npm list swagger-ui-express`

### Invalid Swagger spec

1. Check `src/app/swagger.js` for syntax errors
2. Ensure all `$ref` references are valid
3. Verify all required fields are present in schemas
4. Restart the server after making changes

## Additional Resources

- [OpenAPI 3.0 Specification](https://spec.openapis.org/oas/v3.0.0)
- [Swagger/OpenAPI Documentation](https://swagger.io/tools/swagger-ui/)
- [JSON Schema Reference](https://json-schema.org/)

