class Payment {
    constructor({id, orderId, amount = 0, status = 'pending', createdAt = new Date()}) {
        this.id = id;
        this.orderId = orderId;
        this.amount = amount;
        this.status = status;
        this.createdAt = createdAt;
    }
}

module.exports = Payment;
