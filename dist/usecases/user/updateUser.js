"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
class UpdateUser {
    constructor({ userRepo }) {
        this.userRepo = userRepo;
    }
    async execute({ id, data }) {
        if (!id) {
            throw new Error('id required');
        }
        const existingUser = await this.userRepo.findById(id);
        if (!existingUser) {
            throw new Error('user not found');
        }
        return await this.userRepo.update(id, data);
    }
}
exports.UpdateUser = UpdateUser;
//# sourceMappingURL=updateUser.js.map