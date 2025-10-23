const PaymentRepository = require('../../domain/repositories/paymentRepository');
const Payment = require('../../domain/entities/payment');

class InMemoryPaymentRepository extends PaymentRepository {
    constructor() {
        super();
        this.payments = new Map();
    }

    async create(data) {
        const payment = new Payment(data);
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
        if (!existing) return null;
        const updated = Object.assign({}, existing, data);
        this.payments.set(id, updated);
        return updated;
    }
}

module.exports = InMemoryPaymentRepository;
