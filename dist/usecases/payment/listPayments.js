"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPayments = void 0;
class ListPayments {
    constructor({ paymentRepo }) {
        this.paymentRepo = paymentRepo;
    }
    async execute() {
        return await this.paymentRepo.findAll();
    }
}
exports.ListPayments = ListPayments;
//# sourceMappingURL=listPayments.js.map