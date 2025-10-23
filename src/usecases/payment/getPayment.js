const HttpError = require('../../app/errors/httpError');

class GetPayment {
    constructor({paymentRepo}) {
        this.paymentRepo = paymentRepo;
    }

    async execute({id}) {
        if (!id) throw new HttpError(400, 'id required');
        const payment = await this.paymentRepo.findById(id);
        if (!payment) throw new HttpError(404, 'payment not found');
        return payment;
    }
}

module.exports = GetPayment;
