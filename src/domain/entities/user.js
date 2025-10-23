class User {
    constructor({id, name, email, createdAt = new Date()}) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }
}

module.exports = User;
