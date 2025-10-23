const {v4: uuidv4} = require('uuid');

class CreateOrder {
    constructor({orderRepo}) {
        this.orderRepo = orderRepo;
    }

    async execute({items = [], total = 0}) {
        if (!Array.isArray(items)) throw new Error('items must be array');
        const id = uuidv4();
        return this.orderRepo.create({id, items, total, createdAt: new Date()});
    }
}

module.exports = CreateOrder;
