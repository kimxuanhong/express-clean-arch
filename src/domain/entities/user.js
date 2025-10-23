/**
 * @fileoverview User Entity - Core business entity representing a user
 */

/**
 * User Entity
 * @class
 * @description Represents a user in the system domain layer
 */
class User {
  /**
   * Creates a User instance
   * @constructor
   * @param {{
   *   id: string,
   *   name: string,
   *   email: string,
   *   password?: string,
   *   createdAt?: Date
   * }} userData - User data
   */
  constructor({ id, name, email, password = null, createdAt = new Date() }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // Should be hashed
    this.createdAt = createdAt;
  }
}

module.exports = User;
