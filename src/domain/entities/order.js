class Order {
    constructor({id, items = [], total = 0, createdAt = new Date()}) {
        this.id = id;
        this.items = items;
        this.total = total;
        this.createdAt = createdAt;
    }
}

module.exports = Order;
