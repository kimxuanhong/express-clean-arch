"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPayment = void 0;
class GetPayment {
    constructor({ paymentRepo }) {
        this.paymentRepo = paymentRepo;
    }
    async execute({ id }) {
        if (!id) {
            throw new Error('id required');
        }
        const payment = await this.paymentRepo.findById(id);
        if (!payment) {
            throw new Error('payment not found');
        }
        return payment;
    }
}
exports.GetPayment = GetPayment;
//# sourceMappingURL=getPayment.js.map