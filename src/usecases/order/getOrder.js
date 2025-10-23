const HttpError = require('../../app/errors/httpError');

class GetOrder {
    constructor({orderRepo}) {
        this.orderRepo = orderRepo;
    }

    async execute({id}) {
        if (!id) throw new HttpError(400, 'id required');
        const order = await this.orderRepo.findById(id);
        if (!order) throw new HttpError(404, 'order not found');
        return order;
    }
}

module.exports = GetOrder;
