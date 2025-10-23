class ListOrders {
    constructor({orderRepo}) {
        this.orderRepo = orderRepo;
    }

    async execute() {
        return this.orderRepo.findAll();
    }
}

module.exports = ListOrders;
