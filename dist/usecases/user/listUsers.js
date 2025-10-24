"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsers = void 0;
class ListUsers {
    constructor({ userRepo }) {
        this.userRepo = userRepo;
    }
    async execute() {
        return await this.userRepo.findAll();
    }
}
exports.ListUsers = ListUsers;
//# sourceMappingURL=listUsers.js.map