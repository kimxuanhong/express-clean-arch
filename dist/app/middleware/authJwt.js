"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.generateToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env['JWT_SECRET'] || 'your-secret-key-change-in-production';
exports.JWT_SECRET = JWT_SECRET;
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(401).json({
            message: 'No token provided',
            code: 'NO_TOKEN'
        });
        return;
    }
    const bearerToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    try {
        const decoded = jsonwebtoken_1.default.verify(bearerToken, JWT_SECRET);
        req.userId = decoded.userId;
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({
            message: 'Invalid or expired token',
            code: 'INVALID_TOKEN'
        });
    }
};
exports.verifyToken = verifyToken;
const generateToken = (userId, userEmail) => {
    return jsonwebtoken_1.default.sign({ userId, email: userEmail }, JWT_SECRET, { expiresIn: '24h' });
};
exports.generateToken = generateToken;
//# sourceMappingURL=authJwt.js.map