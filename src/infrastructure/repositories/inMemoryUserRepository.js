const UserRepository = require('../../domain/repositories/userRepository');
const User = require('../../domain/entities/user');

class InMemoryUserRepository extends UserRepository {
    constructor() {
        super();
        this.users = new Map();
    }

    async create(userData) {
        const user = new User(userData);
        this.users.set(user.id, user);
        return user;
    }

    async findById(id) {
        return this.users.get(id) || null;
    }

    async findAll() {
        return Array.from(this.users.values());
    }

    async update(id, data) {
        const existing = this.users.get(id);
        if (!existing) return null;
        const updated = Object.assign({}, existing, data);
        this.users.set(id, updated);
        return updated;
    }

    async delete(id) {
        return this.users.delete(id);
    }
}

module.exports = InMemoryUserRepository;
