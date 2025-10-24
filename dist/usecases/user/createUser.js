"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../../domain/entities/user");
class CreateUser {
    constructor({ userRepo }) {
        this.userRepo = userRepo;
    }
    async execute({ name, email, password }) {
        if (!name || !email) {
            throw new Error('name and email required');
        }
        const existingUser = await this.userRepo.findByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        let hashedPassword = undefined;
        if (password) {
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }
            hashedPassword = await bcryptjs_1.default.hash(password, 10);
        }
        const id = (0, uuid_1.v4)();
        const user = new user_1.User({
            id,
            name,
            email,
            password: hashedPassword || undefined,
            createdAt: new Date()
        });
        return await this.userRepo.create(user);
    }
}
exports.CreateUser = CreateUser;
//# sourceMappingURL=createUser.js.map