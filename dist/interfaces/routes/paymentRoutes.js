"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePaymentRoutes = makePaymentRoutes;
const express_1 = __importDefault(require("express"));
function makePaymentRoutes({ paymentController }) {
    const router = express_1.default.Router();
    router.post('/', (req, res, next) => paymentController.create(req, res, next));
    router.get('/', (req, res, next) => paymentController.list(req, res, next));
    router.get('/:id', (req, res, next) => paymentController.get(req, res, next));
    router.put('/:id', (req, res, next) => paymentController.update(req, res, next));
    return router;
}
//# sourceMappingURL=paymentRoutes.js.map