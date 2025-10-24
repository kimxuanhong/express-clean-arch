"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrder = void 0;
class GetOrder {
    constructor({ orderRepo }) {
        this.orderRepo = orderRepo;
    }
    async execute({ id }) {
        if (!id) {
            throw new Error('id required');
        }
        const order = await this.orderRepo.findById(id);
        if (!order) {
            throw new Error('order not found');
        }
        return order;
    }
}
exports.GetOrder = GetOrder;
//# sourceMappingURL=getOrder.js.map