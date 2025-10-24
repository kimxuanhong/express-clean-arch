"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const userRepository_1 = require("../../domain/repositories/userRepository");
const user_1 = require("../../domain/entities/user");
class InMemoryUserRepository extends userRepository_1.UserRepository {
    constructor() {
        super();
        this.users = new Map();
    }
    async create(user) {
        this.users.set(user.id, user);
        return user;
    }
    async findById(id) {
        return this.users.get(id) || null;
    }
    async findByEmail(email) {
        for (const user of this.users.values()) {
            if (user.email === email) {
                return user;
            }
        }
        return null;
    }
    async findAll() {
        return Array.from(this.users.values());
    }
    async update(id, data) {
        const existing = this.users.get(id);
        if (!existing) {
            throw new Error('User not found');
        }
        const updated = new user_1.User({
            ...existing,
            ...data
        });
        this.users.set(id, updated);
        return updated;
    }
    async delete(id) {
        if (!this.users.has(id)) {
            throw new Error('User not found');
        }
        this.users.delete(id);
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
//# sourceMappingURL=inMemoryUserRepository.js.map