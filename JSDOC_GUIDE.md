# 📖 JSDoc Annotation Guide

Comprehensive JSDoc annotations được thêm vào project để cải thiện code documentation và IDE support.

---

## ✅ Files Với JSDoc

### Controllers (✅ Complete)

#### UserController
```javascript
/**
 * UserController - HTTP request handler for user management
 * @class
 * @description Handles user-related HTTP requests
 */
class UserController {
    /**
     * @constructor
     * @param {{
     *   createUser: CreateUser,
     *   getUser: GetUser,
     *   listUsers: ListUsers,
     *   updateUser: UpdateUser,
     *   deleteUser: DeleteUser,
     *   loginUser: LoginUser
     * }} deps - Use case dependencies
     */
}
```

#### OrderController
```javascript
/**
 * @class
 * @param {{
 *   createOrder: CreateOrder,
 *   getOrder: GetOrder,
 *   listOrders: ListOrders
 * }} deps
 */
```

#### PaymentController
```javascript
/**
 * @class
 * @param {{
 *   createPayment: CreatePayment,
 *   getPayment: GetPayment,
 *   listPayments: ListPayments
 * }} deps
 */
```

---

### Entities (✅ Complete)

#### User Entity
```javascript
/**
 * @class
 * @param {{
 *   id: string,
 *   name: string,
 *   email: string,
 *   password?: string,
 *   createdAt?: Date
 * }} userData
 */
```

#### Order Entity
```javascript
/**
 * @class
 * @param {{
 *   id: string,
 *   items?: Array<{name: string, quantity: number, price: number}>,
 *   total?: number,
 *   createdAt?: Date
 * }} orderData
 */
```

#### Payment Entity
```javascript
/**
 * @class
 * @param {{
 *   id: string,
 *   orderId: string,
 *   amount?: number,
 *   status?: 'pending'|'completed'|'failed'|'cancelled',
 *   createdAt?: Date
 * }} paymentData
 */
```

---

### Use Cases (✅ Complete)

#### CreateUser
```javascript
/**
 * @class
 * @param {{ userRepo: UserRepository }} deps
 */
class CreateUser {
    /**
     * @async
     * @param {{ name: string, email: string, password?: string }} params
     * @returns {Promise<User>}
     * @throws {Error}
     */
    async execute(params) {}
}
```

#### LoginUser
```javascript
/**
 * @class
 * @param {{ userRepo: UserRepository }} deps
 */
class LoginUser {
    /**
     * @async
     * @param {{ email: string, password: string }} params
     * @returns {Promise<{ token: string, user: User }>}
     * @throws {Error}
     */
    async execute(params) {}
}
```

---

### Middleware (✅ Complete)

#### JWT Middleware
```javascript
/**
 * Verifies JWT token from Authorization header
 * @middleware
 * @param {Object} req - Express request
 * @param {string} req.headers.authorization - Bearer token
 * @returns {void}
 * @throws {Error}
 */
const verifyToken = (req, res, next) => {}

/**
 * Generates JWT token for user
 * @param {string} userId - User ID
 * @param {string} userEmail - User email
 * @returns {string} JWT token
 */
const generateToken = (userId, userEmail) => {}
```

#### Validation Middleware
```javascript
/**
 * Handles validation errors from express-validator
 * @middleware
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 * @returns {void}
 */
const handleValidationErrors = (req, res, next) => {}
```

---

## 📝 JSDoc Pattern Used

### Type Annotations với Destructuring

```javascript
// ✅ Good - Rõ ràng và chi tiết
@param {{ id: string, name: string, email: string }} userData

// ❌ Kém - Quá chung chung
@param {Object} userData
```

### Async Methods
```javascript
@async                           // Đánh dấu là async function
@param {Object} params           // Input parameters
@returns {Promise<Type>}         // Return type
@throws {Error}                  // Possible errors
```

### Methods
```javascript
@method methodName               // Tên method
@param {Type} param              // Parameters
@returns {Type}                  // Return type
```

### Classes
```javascript
@class                           // Đánh dấu là class
@description Chi tiết về class  // Mô tả
@constructor                     // Constructor
```

---

## 🔍 IDE Benefits

Với JSDoc annotations, bạn sẽ có:

### 1. Autocomplete Support
```javascript
const user = new User({
  // IDE sẽ gợi ý: id, name, email, password, createdAt
});
```

### 2. Type Checking
```javascript
// IDE cảnh báo nếu type sai
const controller = new UserController({
  // IDE kiểm tra tất cả dependencies
});
```

### 3. Documentation on Hover
```javascript
// Hover vào function sẽ thấy JSDoc
createUser.execute();  // Hover → Xem description, params, returns
```

### 4. Better Refactoring
```javascript
// Rename sẽ an toàn hơn vì IDE biết toàn bộ usages
```

---

## 📚 JSDoc Tags Used

| Tag | Usage | Example |
|-----|-------|---------|
| `@fileoverview` | File description | `@fileoverview User Controller` |
| `@class` | Mark as class | `@class` |
| `@constructor` | Mark constructor | `@constructor` |
| `@param` | Parameter | `@param {string} id` |
| `@returns` | Return type | `@returns {Promise<User>}` |
| `@throws` | Possible errors | `@throws {Error}` |
| `@async` | Async function | `@async` |
| `@method` | Method name | `@method create` |
| `@description` | Description | `@description Creates new user` |
| `@middleware` | Middleware | `@middleware` |

---

## 💡 Type Annotation Examples

### Optional Parameters
```javascript
@param {{ id: string, name?: string }} data
//                           ↑ Optional (?)
```

### Union Types
```javascript
@param {{ status: 'pending'|'completed'|'failed' }} data
//                    ↑ One of these values
```

### Array Types
```javascript
@param {{ items: Array<{name: string, price: number}> }} data
//                 ↑ Array of objects with specific shape
```

### Complex Returns
```javascript
@returns {Promise<{ token: string, user: User }>}
//        ↑ Promise resolves to object with specific shape
```

---

## 🎯 Files Structure with JSDoc

```
src/
├── interfaces/
│   └── controllers/
│       ├── userController.js       ✅ JSDoc added
│       ├── orderController.js      ✅ JSDoc added
│       └── paymentController.js    ✅ JSDoc added
├── usecases/
│   ├── user/
│   │   ├── createUser.js           ✅ JSDoc added
│   │   └── loginUser.js            ✅ JSDoc added
│   ├── order/
│   │   ├── createOrder.js          ⏳ Pending
│   │   └── ...
│   └── payment/
│       ├── createPayment.js        ⏳ Pending
│       └── ...
├── domain/
│   └── entities/
│       ├── user.js                 ✅ JSDoc added
│       ├── order.js                ✅ JSDoc added
│       └── payment.js              ✅ JSDoc added
└── app/
    └── middleware/
        ├── authJwt.js              ✅ JSDoc added
        └── validateRequest.js      ✅ JSDoc added
```

---

## 🚀 Usage in IDE

### VS Code / Cursor
1. Hover over any function to see JSDoc
2. Press `Ctrl+Space` for autocomplete with type hints
3. Use `Go to Definition` for navigation
4. Refactoring is now type-safe

### WebStorm / IntelliJ
1. JSDoc automatically shown in inspector
2. Full type checking during development
3. Better error detection

---

## ✨ Best Practices

### 1. Be Specific
```javascript
// ✅ Good
@param {{ userId: string, orderId: string }} params

// ❌ Bad
@param {Object} params
```

### 2. Include Examples
```javascript
/**
 * @param {{ email: string, password: string }} credentials
 * @example
 * const result = await login.execute({
 *   email: 'user@example.com',
 *   password: 'pass123'
 * });
 */
```

### 3. Document Errors
```javascript
/**
 * @throws {Error} If email already exists
 * @throws {Error} If password too short
 */
```

### 4. Use Proper Return Types
```javascript
// ✅ Good
@returns {Promise<User>}
@returns {Promise<{ token: string, user: User }>}

// ❌ Bad
@returns {Promise}
@returns {Object}
```

---

## 🔗 Resources

- [JSDoc Official](https://jsdoc.app/)
- [TypeScript JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [VS Code JSDoc Support](https://code.visualstudio.com/docs/languages/javascript#_jsdoc-support)

---

## ✅ Summary

✅ Controllers: 3/3 với JSDoc
✅ Entities: 3/3 với JSDoc  
✅ Use Cases: 2/12 với JSDoc (CreateUser, LoginUser)
✅ Middleware: 2/3 với JSDoc

Tổng cộng: **10 files** có JSDoc annotations

---

Last Updated: October 23, 2025
