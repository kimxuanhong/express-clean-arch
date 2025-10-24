"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor({ id, userId, amount, status = 'pending', items = [], createdAt = new Date() }) {
        this.id = id;
        this.userId = userId;
        this.amount = amount;
        this.status = status;
        this.items = items;
        this.createdAt = createdAt;
    }
}
exports.Order = Order;
//# sourceMappingURL=order.js.map