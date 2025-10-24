"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryOrderRepository = void 0;
const orderRepository_1 = require("../../domain/repositories/orderRepository");
const order_1 = require("../../domain/entities/order");
class InMemoryOrderRepository extends orderRepository_1.OrderRepository {
    constructor() {
        super();
        this.orders = new Map();
    }
    async create(order) {
        this.orders.set(order.id, order);
        return order;
    }
    async findById(id) {
        return this.orders.get(id) || null;
    }
    async findAll() {
        return Array.from(this.orders.values());
    }
    async update(id, data) {
        const existing = this.orders.get(id);
        if (!existing) {
            throw new Error('Order not found');
        }
        const updated = new order_1.Order({
            ...existing,
            ...data
        });
        this.orders.set(id, updated);
        return updated;
    }
    async delete(id) {
        if (!this.orders.has(id)) {
            throw new Error('Order not found');
        }
        this.orders.delete(id);
    }
}
exports.InMemoryOrderRepository = InMemoryOrderRepository;
//# sourceMappingURL=inMemoryOrderRepository.js.map