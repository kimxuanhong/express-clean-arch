"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
class GetUser {
    constructor({ userRepo }) {
        this.userRepo = userRepo;
    }
    async execute({ id }) {
        if (!id) {
            throw new Error('id required');
        }
        const user = await this.userRepo.findById(id);
        if (!user) {
            throw new Error('user not found');
        }
        return user;
    }
}
exports.GetUser = GetUser;
//# sourceMappingURL=getUser.js.map