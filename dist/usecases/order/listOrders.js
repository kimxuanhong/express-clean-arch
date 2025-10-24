"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrders = void 0;
class ListOrders {
    constructor({ orderRepo }) {
        this.orderRepo = orderRepo;
    }
    async execute() {
        return await this.orderRepo.findAll();
    }
}
exports.ListOrders = ListOrders;
//# sourceMappingURL=listOrders.js.map