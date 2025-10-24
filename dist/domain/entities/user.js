"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor({ id, name, email, password, createdAt = new Date() }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map