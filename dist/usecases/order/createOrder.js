"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrder = void 0;
const uuid_1 = require("uuid");
const order_1 = require("../../domain/entities/order");
class CreateOrder {
    constructor({ orderRepo }) {
        this.orderRepo = orderRepo;
    }
    async execute({ userId, amount, items }) {
        if (!userId) {
            throw new Error('userId is required');
        }
        if (amount < 0) {
            throw new Error('amount must be non-negative');
        }
        if (!Array.isArray(items)) {
            throw new Error('items must be an array');
        }
        const id = (0, uuid_1.v4)();
        const order = new order_1.Order({
            id,
            userId,
            amount,
            status: 'pending',
            items,
            createdAt: new Date()
        });
        return await this.orderRepo.create(order);
    }
}
exports.CreateOrder = CreateOrder;
//# sourceMappingURL=createOrder.js.map