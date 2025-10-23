# 🚀 START HERE - Complete Guide

Welcome to the Clean Architecture API with JWT Authentication!

---

## 📖 What You Have

A production-ready Node.js API with:
- ✅ Clean Architecture design
- ✅ Swagger/OpenAPI documentation
- ✅ JWT authentication
- ✅ Request validation
- ✅ Password hashing
- ✅ CORS support

---

## 🎯 Quick Start (2 minutes)

### 1. Start the server
```bash
npm start
```

### 2. Open Swagger UI
```
http://localhost:3000/docs
```

### 3. Create a user
1. Click `POST /users` endpoint
2. Click "Try it out"
3. Enter this body:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```
4. Click "Execute"

### 4. Login to get token
1. Click `POST /users/login` endpoint
2. Click "Try it out"
3. Enter:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
4. Copy the token from response

### 5. Use token for protected routes
1. Click "Authorize" button (top right)
2. Paste: `Bearer YOUR_TOKEN_HERE`
3. Now try `GET /users` - it will work!

---

## 📚 Complete Documentation

Read these files in order:

1. **AUTHENTICATION_GUIDE.md** (Start here!)
   - Complete authentication guide
   - Step-by-step examples
   - Security best practices

2. **SWAGGER_GUIDE.md**
   - Swagger UI tutorial
   - API endpoint details
   - Testing guide

3. **SWAGGER_EXAMPLES.md**
   - Copy-paste curl examples
   - Real-world workflows
   - Error examples

4. **README.md**
   - Project overview
   - Architecture explanation
   - File structure

5. **AUTH_IMPLEMENTATION_COMPLETE.md**
   - Implementation details
   - What was added
   - Security checklist

6. **DOCUMENTATION_INDEX.md**
   - Navigation guide
   - Quick references
   - Learning paths

---

## 🔑 Key Endpoints

### Register & Login (Public)
```bash
# Register
POST /users
{"name": "John", "email": "john@example.com", "password": "pass123"}

# Login
POST /users/login
{"email": "john@example.com", "password": "pass123"}
```

### Protected Routes (Require JWT)
```bash
# Get all users
GET /users
Header: Authorization: Bearer TOKEN

# Get user by ID
GET /users/{id}
Header: Authorization: Bearer TOKEN

# Update user
PUT /users/{id}
Header: Authorization: Bearer TOKEN

# Delete user
DELETE /users/{id}
Header: Authorization: Bearer TOKEN
```

---

## ✅ Validation Rules

| Endpoint | Field | Required | Rules |
|----------|-------|----------|-------|
| POST /users | name | ✅ | 2-255 chars |
| POST /users | email | ✅ | Valid email |
| POST /users | password | ❌ | Min 6 chars |
| POST /users/login | email | ✅ | Valid email |
| POST /users/login | password | ✅ | Min 6 chars |
| PUT /users/{id} | name | ❌ | 2-255 chars if provided |
| PUT /users/{id} | email | ❌ | Valid email if provided |

---

## 🧪 Test Examples

### Using curl

```bash
# 1. Register
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"pass123"}'

# 2. Login & save token
TOKEN=$(curl -s -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"pass123"}' \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

# 3. Use token
curl http://localhost:3000/users \
  -H "Authorization: Bearer $TOKEN"
```

### Using Python

```python
import requests

# Register
r = requests.post('http://localhost:3000/users', json={
    'name': 'Bob',
    'email': 'bob@example.com',
    'password': 'pass123'
})

# Login
r = requests.post('http://localhost:3000/users/login', json={
    'email': 'bob@example.com',
    'password': 'pass123'
})
token = r.json()['token']

# Use token
headers = {'Authorization': f'Bearer {token}'}
r = requests.get('http://localhost:3000/users', headers=headers)
print(r.json())
```

---

## 🔒 Security Features

### What's Protected
✅ Passwords hashed with bcryptjs
✅ JWT tokens signed with secret
✅ Tokens expire after 24 hours
✅ All input validated
✅ CORS enabled for UI

### What's Open (Public)
✅ User registration (POST /users)
✅ User login (POST /users/login)

### What's Closed (Protected)
✅ Get/List users
✅ Update/Delete users
✅ All other routes

---

## 🚀 Development vs Production

### Development (Default)
```
HTTP: Yes
JWT_SECRET: "your-secret-key-change-in-production"
CORS: Enabled (all origins)
```

### Production Setup
```bash
# Use HTTPS
# Set strong JWT_SECRET
export JWT_SECRET="generate-strong-random-key-here"

# Restrict CORS
# Enable rate limiting
# Enable logging
# Use environment variables
```

---

## 📊 Project Files

```
src/
├── app/
│   ├── middleware/
│   │   ├── authJwt.js        ← JWT authentication
│   │   ├── validateRequest.js ← Request validation
│   │   └── requestId.js
│   ├── app.js                ← Express setup
│   └── swagger.js            ← API documentation
├── usecases/
│   └── user/
│       ├── loginUser.js      ← Login logic
│       ├── createUser.js     ← Registration logic
│       └── ...
├── interfaces/
│   ├── controllers/          ← HTTP handlers
│   └── routes/               ← URL routes
├── domain/
│   ├── entities/             ← Data models
│   └── repositories/         ← Data access
└── infrastructure/           ← Implementations
```

---

## 💡 Common Tasks

### Get a token
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","password":"yourpassword"}'
```

### Use token in curl
```bash
curl http://localhost:3000/users \
  -H "Authorization: Bearer your_token_here"
```

### Test validation
```bash
# Invalid email
curl -X POST http://localhost:3000/users \
  -d '{"name":"Test","email":"invalid"}'

# Password too short
curl -X POST http://localhost:3000/users \
  -d '{"name":"Test","email":"test@example.com","password":"short"}'
```

### Swagger UI testing
1. Go to http://localhost:3000/docs
2. Find endpoint
3. Click "Try it out"
4. Fill in values
5. Click "Execute"
6. See response!

---

## ❓ Troubleshooting

### "No token provided"
→ Missing Authorization header
→ Fix: Add `Authorization: Bearer TOKEN`

### "Invalid or expired token"
→ Token is wrong or expired
→ Fix: Get new token from login endpoint

### "Validation failed"
→ Invalid input data
→ Fix: Check error details and correct input

### "CORS error"
→ Browser blocking request
→ Fix: Use correct URL (http://localhost:3000)

---

## 📞 Need Help?

1. Check **AUTHENTICATION_GUIDE.md** - Complete reference
2. See **SWAGGER_EXAMPLES.md** - Real examples
3. Read **README.md** - Architecture overview
4. Try **Swagger UI** - Interactive testing

---

## ✨ What's Next?

1. ✅ Read AUTHENTICATION_GUIDE.md
2. ✅ Test endpoints in Swagger UI
3. ✅ Use examples from SWAGGER_EXAMPLES.md
4. ✅ Build your frontend app
5. ✅ Deploy to production

---

## 🎓 Learn More

- [JWT.io](https://jwt.io) - JWT tokens
- [Express.js](https://expressjs.com) - Framework
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password hashing

---

## 🎊 Ready?

### Start Here:
1. Read **AUTHENTICATION_GUIDE.md**
2. Visit **http://localhost:3000/docs**
3. Try an endpoint!

**Good luck!** 🚀

---

Last Updated: October 23, 2025
