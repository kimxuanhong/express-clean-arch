class User {
  constructor({ id, name, email, password = null, createdAt = new Date() }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // Should be hashed
    this.createdAt = createdAt;
  }
}

module.exports = User;
