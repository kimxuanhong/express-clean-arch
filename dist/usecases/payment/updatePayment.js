"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePayment = void 0;
class UpdatePayment {
    constructor({ paymentRepo }) {
        this.paymentRepo = paymentRepo;
    }
    async execute({ id, data }) {
        if (!id) {
            throw new Error('id required');
        }
        const existing = await this.paymentRepo.findById(id);
        if (!existing) {
            throw new Error('payment not found');
        }
        if (data.status && existing.status === 'pending' && data.status === 'completed') {
            return await this.paymentRepo.update(id, { ...existing, status: 'completed' });
        }
        if (!data.status) {
            return await this.paymentRepo.update(id, data);
        }
        throw new Error('invalid status transition');
    }
}
exports.UpdatePayment = UpdatePayment;
//# sourceMappingURL=updatePayment.js.map