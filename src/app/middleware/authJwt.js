/**
 * @fileoverview JWT Authentication Middleware - Token verification and generation
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Verifies JWT token from Authorization header
 * @middleware
 * @param {Object} req - Express request object
 * @param {string} req.headers.authorization - Bearer token
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 * @throws {Error} Sends 401 if token missing or invalid
 */
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
      message: 'No token provided',
      code: 'NO_TOKEN'
    });
  }

  // Remove 'Bearer ' prefix if present
  const bearerToken = token.startsWith('Bearer ') ? token.slice(7) : token;

  try {
    const decoded = jwt.verify(bearerToken, JWT_SECRET);
    req.userId = decoded.id;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired token',
      code: 'INVALID_TOKEN'
    });
  }
};

/**
 * Generates JWT token for user
 * @param {string} userId - User's unique identifier
 * @param {string} userEmail - User's email address
 * @returns {string} Signed JWT token (expires in 24 hours)
 */
const generateToken = (userId, userEmail) => {
  return jwt.sign(
    { id: userId, email: userEmail },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

module.exports = {
  verifyToken,
  generateToken,
  JWT_SECRET
};
