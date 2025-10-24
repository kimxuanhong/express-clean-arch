"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
class PaymentController {
    constructor(deps) {
        this.createPayment = deps.createPayment;
        this.getPayment = deps.getPayment;
        this.listPayments = deps.listPayments;
        this.updatePayment = deps.updatePayment;
    }
    async create(req, res, next) {
        try {
            const payment = await this.createPayment.execute(req.body);
            res.status(201).json(payment);
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
            const payment = await this.getPayment.execute({ id });
            res.json(payment);
        }
        catch (e) {
            next(e);
        }
    }
    async list(_req, res, next) {
        try {
            const payments = await this.listPayments.execute();
            res.json(payments);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const id = req.params['id'];
            if (!id) {
                res.status(400).json({ error: 'ID is required' });
                return;
            }
            const payment = await this.updatePayment.execute({ id, data: req.body });
            res.json(payment);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=paymentController.js.map