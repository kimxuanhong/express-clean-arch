const bcrypt = require('bcryptjs');
const { generateToken } = require('../../app/middleware/authJwt');

class LoginUser {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

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
