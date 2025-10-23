const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
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

// Helper function to generate token
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
