"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
class OrderController {
    constructor(deps) {
        this.createOrder = deps.createOrder;
        this.getOrder = deps.getOrder;
        this.listOrders = deps.listOrders;
    }
    async create(req, res, next) {
        try {
            const order = await this.createOrder.execute(req.body);
            res.status(201).json(order);
        }
        catch (e) {
            next(e);
        }
    }
    async get(req, res, next) {
        try {
            const id = req.params['id'];
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            const order = await this.getOrder.execute({ id });
            res.json(order);
        }
        catch (e) {
            next(e);
        }
    }
    async list(_req, res, next) {
        try {
            const orders = await this.listOrders.execute();
            res.json(orders);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=orderController.js.map