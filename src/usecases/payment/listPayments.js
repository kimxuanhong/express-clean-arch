class ListPayments {
    constructor({paymentRepo}) {
        this.paymentRepo = paymentRepo;
    }

    async execute() {
        return this.paymentRepo.findAll();
    }
}

module.exports = ListPayments;
