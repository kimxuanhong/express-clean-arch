"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOrderRoutes = makeOrderRoutes;
const express_1 = __importDefault(require("express"));
function makeOrderRoutes({ orderController }) {
    const router = express_1.default.Router();
    router.post('/', (req, res, next) => orderController.create(req, res, next));
    router.get('/', (req, res, next) => orderController.list(req, res, next));
    router.get('/:id', (req, res, next) => orderController.get(req, res, next));
    return router;
}
//# sourceMappingURL=orderRoutes.js.map