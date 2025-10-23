const OrderRepository = require('../../domain/repositories/orderRepository');
const Order = require('../../domain/entities/order');

class InMemoryOrderRepository extends OrderRepository {
    constructor() {
        super();
        this.orders = new Map();
    }

    async create(data) {
        const order = new Order(data);
        this.orders.set(order.id, order);
        return order;
    }

    async findById(id) {
        return this.orders.get(id) || null;
    }

    async findAll() {
        return Array.from(this.orders.values());
    }
}

module.exports = InMemoryOrderRepository;
