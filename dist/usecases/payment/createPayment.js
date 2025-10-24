"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePayment = void 0;
const uuid_1 = require("uuid");
const payment_1 = require("../../domain/entities/payment");
class CreatePayment {
    constructor({ paymentRepo, orderRepo }) {
        this.paymentRepo = paymentRepo;
        this.orderRepo = orderRepo;
    }
    async execute({ orderId, amount, method }) {
        if (!orderId || typeof amount !== 'number') {
            throw new Error('orderId and numeric amount required');
        }
        if (!method) {
            throw new Error('payment method is required');
        }
        const order = await this.orderRepo.findById(orderId);
        if (!order) {
            throw new Error('order not found');
        }
        if (Number(order.amount) !== Number(amount)) {
            throw new Error('amount does not match order total');
        }
        const id = (0, uuid_1.v4)();
        const payment = new payment_1.Payment({
            id,
            orderId,
            amount,
            status: 'pending',
            method,
            createdAt: new Date()
        });
        return await this.paymentRepo.create(payment);
    }
}
exports.CreatePayment = CreatePayment;
//# sourceMappingURL=createPayment.js.map