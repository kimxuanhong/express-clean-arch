"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPaymentRepository = void 0;
const paymentRepository_1 = require("../../domain/repositories/paymentRepository");
const payment_1 = require("../../domain/entities/payment");
class InMemoryPaymentRepository extends paymentRepository_1.PaymentRepository {
    constructor() {
        super();
        this.payments = new Map();
    }
    async create(payment) {
        this.payments.set(payment.id, payment);
        return payment;
    }
    async findById(id) {
        return this.payments.get(id) || null;
    }
    async findAll() {
        return Array.from(this.payments.values());
    }
    async update(id, data) {
        const existing = this.payments.get(id);
        if (!existing) {
            throw new Error('Payment not found');
        }
        const updated = new payment_1.Payment({
            ...existing,
            ...data
        });
        this.payments.set(id, updated);
        return updated;
    }
    async delete(id) {
        if (!this.payments.has(id)) {
            throw new Error('Payment not found');
        }
        this.payments.delete(id);
    }
}
exports.InMemoryPaymentRepository = InMemoryPaymentRepository;
//# sourceMappingURL=inMemoryPaymentRepository.js.map