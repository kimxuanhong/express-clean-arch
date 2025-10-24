"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class LoginUser {
    constructor({ userRepo, generateToken }) {
        this.userRepo = userRepo;
        this.generateToken = generateToken;
    }
    async execute({ email, password }) {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        if (!user.password) {
            throw new Error('User has no password set');
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }
        const token = this.generateToken(user.id, user.email);
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        };
    }
}
exports.LoginUser = LoginUser;
//# sourceMappingURL=loginUser.js.map