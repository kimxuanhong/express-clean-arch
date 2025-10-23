/**
 * @fileoverview LoginUser Use Case - Handles user authentication
 */

const bcrypt = require('bcryptjs');
const { generateToken } = require('../../app/middleware/authJwt');

/**
 * LoginUser Use Case
 * @class
 * @description Handles user authentication and JWT token generation
 */
class LoginUser {
  /**
   * Creates a LoginUser use case instance
   * @constructor
   * @param {{ userRepo: UserRepository }} deps - Dependencies
   */
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

  /**
   * Executes user login
   * @async
   * @param {{ email: string, password: string }} params - Login credentials
   * @returns {Promise<{ token: string, user: User }>} JWT token and user object
   * @throws {Error} If credentials invalid or user not found
   */
  async execute({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Get all users and find by email
    const allUsers = await this.userRepo.findAll();
    const user = allUsers.find(u => u.email === email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email);

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

module.exports = LoginUser;
