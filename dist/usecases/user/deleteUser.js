"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = void 0;
class DeleteUser {
    constructor({ userRepo }) {
        this.userRepo = userRepo;
    }
    async execute({ id }) {
        if (!id) {
            throw new Error('id required');
        }
        const existingUser = await this.userRepo.findById(id);
        if (!existingUser) {
            throw new Error('user not found');
        }
        await this.userRepo.delete(id);
    }
}
exports.DeleteUser = DeleteUser;
//# sourceMappingURL=deleteUser.js.map