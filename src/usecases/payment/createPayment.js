const {v4: uuidv4} = require('uuid');
const HttpError = require('../../app/errors/httpError');

class CreatePayment {
    constructor({paymentRepo, orderRepo}) {
        this.paymentRepo = paymentRepo;
        this.orderRepo = orderRepo;
    }

    async execute({orderId, amount}) {
        if (!orderId || typeof amount !== 'number') throw new HttpError(400, 'orderId and numeric amount required');
        // validate order exists
        const order = await this.orderRepo.findById(orderId);
        if (!order) throw new HttpError(404, 'order not found');
        // validate amount matches order total
        if (Number(order.total) !== Number(amount)) throw new HttpError(400, 'amount does not match order total');
        const id = uuidv4();
        // create payment in pending state
        return this.paymentRepo.create({id, orderId, amount, status: 'pending', createdAt: new Date()});
    }
}

module.exports = CreatePayment;
