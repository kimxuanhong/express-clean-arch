"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserRoutes = makeUserRoutes;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../../app/middleware/validateRequest");
const authJwt_1 = require("../../app/middleware/authJwt");
function makeUserRoutes({ userController }) {
    const router = express_1.default.Router();
    router.post('/login', [
        (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email'),
        (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ], validateRequest_1.handleValidationErrors, (req, res, next) => userController.login(req, res, next));
    router.post('/', [
        (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
        (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email'),
        (0, express_validator_1.body)('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters if provided')
    ], validateRequest_1.handleValidationErrors, (req, res, next) => userController.create(req, res, next));
    router.get('/', authJwt_1.verifyToken, (req, res, next) => userController.list(req, res, next));
    router.get('/:id', authJwt_1.verifyToken, (req, res, next) => userController.get(req, res, next));
    router.put('/:id', authJwt_1.verifyToken, [
        (0, express_validator_1.body)('name').optional().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
        (0, express_validator_1.body)('email').optional().isEmail().withMessage('Invalid email')
    ], validateRequest_1.handleValidationErrors, (req, res, next) => userController.update(req, res, next));
    router.delete('/:id', authJwt_1.verifyToken, (req, res, next) => userController.delete(req, res, next));
    return router;
}
//# sourceMappingURL=userRoutes.js.map