class UpdatePayment {
    constructor({paymentRepo}) {
        this.paymentRepo = paymentRepo;
    }

    async execute({id, data}) {
        if (!id) throw new Error('id required');
        const existing = await this.paymentRepo.findById(id);
        if (!existing) throw new Error('payment not found');
        // only allow status transition pending -> completed for now
        if (data.status && existing.status === 'pending' && data.status === 'completed') {
            return this.paymentRepo.update(id, Object.assign({}, existing, {status: 'completed'}));
        }
        // reject invalid transitions
        throw new Error('invalid status transition');
    }
}

module.exports = UpdatePayment;
