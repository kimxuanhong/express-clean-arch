"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
class Payment {
    constructor({ id, orderId, amount, status = 'pending', method, createdAt = new Date() }) {
        this.id = id;
        this.orderId = orderId;
        this.amount = amount;
        this.status = status;
        this.method = method;
        this.createdAt = createdAt;
    }
}
exports.Payment = Payment;
//# sourceMappingURL=payment.js.map