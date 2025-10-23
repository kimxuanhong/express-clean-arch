# Swagger API Documentation Examples

This document provides real examples of how to use the API and what responses you'll get.

## 1. Users API Examples

### 1.1 Create a New User

**Swagger UI Path:** Users → POST /users → Try it out

**Request Example:**
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

**Swagger Schema Validation:**
```
Request Body:
✓ name: required, string (1-255 chars)
✓ email: required, string, valid email format

Response:
✓ 201: User created with id, name, email, createdAt
✓ 400: Invalid request (missing required fields or invalid format)
```

---

### 1.2 Get All Users

**Swagger UI Path:** Users → GET /users → Try it out

**Request Example:**
```bash
curl http://localhost:3000/users
```

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-10-23T10:30:00.000Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "createdAt": "2025-10-23T11:00:00.000Z"
  }
]
```

---

### 1.3 Get User by ID

**Swagger UI Path:** Users → GET /users/{id} → Try it out

**Request Example:**
```bash
curl http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2025-10-23T10:30:00.000Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "User not found"
}
```

---

### 1.4 Update User

**Swagger UI Path:** Users → PUT /users/{id} → Try it out

**Request Example:**
```bash
curl -X PUT http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com"
  }'
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Updated",
  "email": "john.updated@example.com",
  "createdAt": "2025-10-23T10:30:00.000Z"
}
```

---

### 1.5 Delete User

**Swagger UI Path:** Users → DELETE /users/{id} → Try it out

**Request Example:**
```bash
curl -X DELETE http://localhost:3000/users/550e8400-e29b-41d4-a716-446655440000
```

**Response (204 No Content):**
```
(empty body)
```

---

## 2. Orders API Examples

### 2.1 Create an Order

**Swagger UI Path:** Orders → POST /orders → Try it out

**Request Example:**
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "name": "Laptop",
        "quantity": 1,
        "price": 999.99
      },
      {
        "name": "Mouse",
        "quantity": 2,
        "price": 29.99
      },
      {
        "name": "Keyboard",
        "quantity": 1,
        "price": 89.99
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
      "name": "Laptop",
      "quantity": 1,
      "price": 999.99
    },
    {
      "name": "Mouse",
      "quantity": 2,
      "price": 29.99
    },
    {
      "name": "Keyboard",
      "quantity": 1,
      "price": 89.99
    }
  ],
  "total": 1149.96,
  "createdAt": "2025-10-23T12:00:00.000Z"
}
```

**Swagger Schema Validation:**
```
Request Body:
✓ items: required, array with minimum 1 item
✓ items[].name: required, string
✓ items[].quantity: required, number >= 1
✓ items[].price: required, number >= 0

Response:
✓ 201: Order created with calculated total
✓ 400: Invalid request (missing items or invalid format)
```

---

### 2.2 Get All Orders

**Swagger UI Path:** Orders → GET /orders → Try it out

**Request Example:**
```bash
curl http://localhost:3000/orders
```

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "items": [
      {
        "name": "Laptop",
        "quantity": 1,
        "price": 999.99
      }
    ],
    "total": 999.99,
    "createdAt": "2025-10-23T12:00:00.000Z"
  }
]
```

---

### 2.3 Get Order by ID

**Swagger UI Path:** Orders → GET /orders/{id} → Try it out

**Request Example:**
```bash
curl http://localhost:3000/orders/550e8400-e29b-41d4-a716-446655440010
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "items": [
    {
      "name": "Laptop",
      "quantity": 1,
      "price": 999.99
    }
  ],
  "total": 999.99,
  "createdAt": "2025-10-23T12:00:00.000Z"
}
```

---

## 3. Payments API Examples

### 3.1 Create a Payment

**Swagger UI Path:** Payments → POST /payments → Try it out

**Request Example:**
```bash
curl -X POST http://localhost:3000/payments \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "550e8400-e29b-41d4-a716-446655440010",
    "amount": 1149.96
  }'
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440020",
  "orderId": "550e8400-e29b-41d4-a716-446655440010",
  "amount": 1149.96,
  "status": "pending",
  "createdAt": "2025-10-23T12:30:00.000Z"
}
```

**Swagger Schema Validation:**
```
Request Body:
✓ orderId: required, string (UUID format)
✓ amount: required, number >= 0

Response:
✓ 201: Payment created with status "pending"
✓ 400: Invalid request or order not found
```

---

### 3.2 Get All Payments

**Swagger UI Path:** Payments → GET /payments → Try it out

**Request Example:**
```bash
curl http://localhost:3000/payments
```

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440020",
    "orderId": "550e8400-e29b-41d4-a716-446655440010",
    "amount": 1149.96,
    "status": "pending",
    "createdAt": "2025-10-23T12:30:00.000Z"
  }
]
```

---

### 3.3 Get Payment by ID

**Swagger UI Path:** Payments → GET /payments/{id} → Try it out

**Request Example:**
```bash
curl http://localhost:3000/payments/550e8400-e29b-41d4-a716-446655440020
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440020",
  "orderId": "550e8400-e29b-41d4-a716-446655440010",
  "amount": 1149.96,
  "status": "pending",
  "createdAt": "2025-10-23T12:30:00.000Z"
}
```

---

### 3.4 Update Payment Status

**Swagger UI Path:** Payments → PUT /payments/{id} → Try it out

**Request Example (Approve Payment):**
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
  "amount": 1149.96,
  "status": "completed",
  "createdAt": "2025-10-23T12:30:00.000Z"
}
```

**Valid Status Transitions:**
```
pending   → completed (successful payment)
pending   → failed    (payment declined)
pending   → cancelled (payment cancelled)
completed → cancelled (refund)
```

---

## Complete Workflow Example

Here's a complete example workflow using all three resources:

### Step 1: Create a User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'
```
**Response:** User ID: `550e8400-e29b-41d4-a716-446655440000`

### Step 2: Create an Order
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"name":"Book","quantity":3,"price":15.99}
    ]
  }'
```
**Response:** Order ID: `550e8400-e29b-41d4-a716-446655440010`
**Total:** $47.97

### Step 3: Create a Payment
```bash
curl -X POST http://localhost:3000/payments \
  -H "Content-Type: application/json" \
  -d '{
    "orderId":"550e8400-e29b-41d4-a716-446655440010",
    "amount":47.97
  }'
```
**Response:** Payment ID: `550e8400-e29b-41d4-a716-446655440020`
**Status:** pending

### Step 4: Complete the Payment
```bash
curl -X PUT http://localhost:3000/payments/550e8400-e29b-41d4-a716-446655440020 \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```
**Response:** Payment status updated to completed

---

## Error Examples

### Missing Required Field
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}'  # Missing email
```

**Response (400 Bad Request):**
```json
{
  "message": "Missing required field: email"
}
```

### Invalid Email Format
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"invalid-email"}'
```

**Response (400 Bad Request):**
```json
{
  "message": "Invalid email format"
}
```

### Resource Not Found
```bash
curl http://localhost:3000/users/nonexistent-id
```

**Response (404 Not Found):**
```json
{
  "message": "User not found"
}
```

---

## Tips for Using Swagger UI

1. **Read the Description** - Each endpoint has a detailed description
2. **Check the Schemas** - See the exact structure expected
3. **Try Examples** - Use the "Try it out" button to test
4. **View Status Codes** - Understand what each response code means
5. **Download Spec** - Download the OpenAPI spec for use in other tools

## Testing Tools

You can also test the API using:
- **Postman** - Import the OpenAPI spec at `/docs-json`
- **Insomnia** - Import the OpenAPI spec
- **Thunder Client** - VSCode extension
- **REST Client** - VSCode extension
- **curl** - Command line tool
- **Swagger UI** - Direct from browser at `/docs`

