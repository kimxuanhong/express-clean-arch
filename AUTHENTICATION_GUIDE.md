# 🔐 Authentication & Validation Guide

## Overview

This document explains how to use JWT authentication and request validation in the Clean Architecture API.

---

## 📋 Table of Contents

1. [Authentication Overview](#authentication-overview)
2. [Request Validation](#request-validation)
3. [Using the API](#using-the-api)
4. [Security Best Practices](#security-best-practices)

---

## 🔐 Authentication Overview

### What is JWT?

JWT (JSON Web Token) is a standard token-based authentication method. It contains:
- **Header**: Algorithm and token type
- **Payload**: User information (ID, email, expiration time)
- **Signature**: Ensures the token hasn't been tampered with

### Token Lifespan

Tokens expire after **24 hours**. After expiration, users must login again.

### Public vs Protected Routes

#### Public Routes (No JWT Required)
- `POST /users/login` - Login to get token
- `POST /users` - Register new user

#### Protected Routes (JWT Required)
- `GET /users` - List all users
- `GET /users/{id}` - Get user by ID
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

---

## 🔑 Step 1: User Registration

### Register a New User

**Endpoint:** `POST /users`

**Request:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response (201 Created):**
```json
{
  "id": "8d3d5748-4940-408f-8bde-8a9915c21695",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$v4oI/BM.fPT46prJfTP.MeLLV2qdSRmYUxoYYzQn5d4c93KvFRNYO",
  "createdAt": "2025-10-23T08:34:16.861Z"
}
```

**Validation Rules:**
- `name`: Required, minimum 2 characters
- `email`: Required, must be valid email format
- `password`: Optional, minimum 6 characters if provided

**Errors:**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ]
}
```

---

## 🎟️ Step 2: User Login

### Get JWT Token

**Endpoint:** `POST /users/login`

**Request:**
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "8d3d5748-4940-408f-8bde-8a9915c21695",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-10-23T08:34:16.861Z"
  }
}
```

**Validation Rules:**
- `email`: Required, must be valid email format
- `password`: Required, minimum 6 characters

**Errors:**
```json
{
  "message": "Invalid email or password"
}
```

---

## 🔑 Step 3: Using the Token

### Accessing Protected Routes

Once you have a token, include it in the `Authorization` header for protected routes.

#### Option 1: Bearer Token Format (Recommended)

```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Option 2: Raw Token

```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Example: Get All Users

**Request:**
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response (200 OK):**
```json
[
  {
    "id": "8d3d5748-4940-408f-8bde-8a9915c21695",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "$2a$10$v4oI/BM.fPT46prJfTP...",
    "createdAt": "2025-10-23T08:34:16.861Z"
  }
]
```

### Missing Token Error

**Request (without token):**
```bash
curl -X GET http://localhost:3000/users
```

**Response (401 Unauthorized):**
```json
{
  "message": "No token provided",
  "code": "NO_TOKEN"
}
```

### Invalid Token Error

**Request (invalid token):**
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer invalid_token"
```

**Response (401 Unauthorized):**
```json
{
  "message": "Invalid or expired token",
  "code": "INVALID_TOKEN"
}
```

---

## ✅ Request Validation

### Validation Rules by Endpoint

#### POST /users (Register)

| Field | Required | Rules | Example |
|-------|----------|-------|---------|
| name | ✅ | Min 2 chars, max 255 | "John Doe" |
| email | ✅ | Valid email format | "john@example.com" |
| password | ❌ | Min 6 chars if provided | "password123" |

#### POST /users/login

| Field | Required | Rules | Example |
|-------|----------|-------|---------|
| email | ✅ | Valid email format | "john@example.com" |
| password | ✅ | Min 6 chars | "password123" |

#### PUT /users/{id} (Update)

| Field | Required | Rules | Example |
|-------|----------|-------|---------|
| name | ❌ | Min 2 chars if provided | "Jane Doe" |
| email | ❌ | Valid email if provided | "jane@example.com" |

### Validation Error Response

All validation errors return `400 Bad Request`:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

### Common Validation Errors

#### Invalid Email
```json
{
  "message": "Validation failed",
  "errors": [{"field": "email", "message": "Invalid email"}]
}
```

#### Password Too Short
```json
{
  "message": "Validation failed",
  "errors": [{"field": "password", "message": "Password must be at least 6 characters if provided"}]
}
```

#### Missing Required Field
```json
{
  "message": "Validation failed",
  "errors": [{"field": "name", "message": "Name is required"}]
}
```

---

## 🔄 Complete Authentication Flow

### 1. Create User Account
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"mypassword"}'
```

### 2. Login & Get Token
```bash
RESPONSE=$(curl -s -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"mypassword"}')

TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
echo $TOKEN
```

### 3. Use Token for Protected Routes
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Update User Info
```bash
curl -X PUT http://localhost:3000/users/USER_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Alice Smith","email":"alice.smith@example.com"}'
```

---

## 🔒 Security Best Practices

### 1. Password Security
- ✅ **DO**: Use strong passwords (min 6 characters, mix of letters, numbers, symbols)
- ✅ **DO**: Never share your token
- ✅ **DO**: Regenerate token periodically
- ❌ **DON'T**: Store passwords in plain text
- ❌ **DON'T**: Share tokens via email or messaging
- ❌ **DON'T**: Use the same password for multiple services

### 2. Token Security
- ✅ **DO**: Use HTTPS in production (not HTTP)
- ✅ **DO**: Store token securely (HttpOnly cookie or secure storage)
- ✅ **DO**: Include token in Authorization header
- ✅ **DO**: Handle token expiration by re-logging in
- ❌ **DON'T**: Store token in localStorage (vulnerable to XSS)
- ❌ **DON'T**: Include token in URL query parameters
- ❌ **DON'T**: Share token in request body

### 3. Environment Security
- ✅ **DO**: Change `JWT_SECRET` in production
- ✅ **DO**: Use environment variables for secrets
- ✅ **DO**: Enable HTTPS/TLS
- ✅ **DO**: Use strong JWT secret (32+ characters)

### 4. API Security
- ✅ **DO**: Validate all input
- ✅ **DO**: Implement rate limiting
- ✅ **DO**: Use CORS properly
- ✅ **DO**: Log authentication events
- ❌ **DON'T**: Trust client-side validation only
- ❌ **DON'T**: Expose internal error details

---

## 🔐 Environment Variables

Configure these for your environment:

```bash
# JWT Secret (change in production!)
export JWT_SECRET="your-very-secure-secret-key-change-this"

# Server Port
export PORT=3000

# Node Environment
export NODE_ENV=production
```

---

## 📝 Code Examples

### JavaScript/Node.js

```javascript
const token = "your_jwt_token_here";

fetch('http://localhost:3000/users', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

### Python

```python
import requests

token = "your_jwt_token_here"
headers = {"Authorization": f"Bearer {token}"}

response = requests.get('http://localhost:3000/users', headers=headers)
print(response.json())
```

### cURL

```bash
TOKEN="your_jwt_token_here"

curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🧪 Testing in Swagger UI

1. Go to `http://localhost:3000/docs`
2. Click on login endpoint: `POST /users/login`
3. Click "Try it out"
4. Enter credentials and execute
5. Copy the token from response
6. Click "Authorize" button (top right)
7. Enter: `Bearer YOUR_TOKEN_HERE`
8. Now protected endpoints will work!

---

## ❓ Troubleshooting

### "No token provided"
- **Cause**: Authorization header missing
- **Fix**: Include `Authorization: Bearer TOKEN` in headers

### "Invalid or expired token"
- **Cause**: Token is malformed, invalid, or expired
- **Fix**: Get a new token by logging in again

### "Invalid email or password"
- **Cause**: Wrong email/password combination
- **Fix**: Check credentials and try again

### "Validation failed"
- **Cause**: Invalid input data
- **Fix**: Check error details and correct input

---

## 📚 Related Files

- `src/app/middleware/authJwt.js` - JWT authentication logic
- `src/app/middleware/validateRequest.js` - Request validation logic
- `src/usecases/user/loginUser.js` - Login business logic
- `src/interfaces/routes/userRoutes.js` - Route definitions
- `src/app/swagger.js` - API documentation

---

## 🎓 Learning Resources

- [JWT.io](https://jwt.io/) - JWT official site
- [Express.js Guide](https://expressjs.com/) - Express framework
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password hashing
- [express-validator](https://express-validator.github.io/) - Validation library

---

Last Updated: October 23, 2025
