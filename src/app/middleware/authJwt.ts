import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from '../types';

/**
 * @fileoverview JWT Authentication Middleware - Token verification and generation
 */

const JWT_SECRET = process.env['JWT_SECRET'] || 'your-secret-key-change-in-production';

/**
 * Verifies JWT token from Authorization header
 * @middleware
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 * @returns void
 * @throws Error Sends 401 if token missing or invalid
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).json({
      message: 'No token provided',
      code: 'NO_TOKEN'
    });
    return;
  }

  // Remove 'Bearer ' prefix if present
  const bearerToken = token.startsWith('Bearer ') ? token.slice(7) : token;

  try {
    const decoded = jwt.verify(bearerToken, JWT_SECRET) as JwtPayload;
    (req as any).userId = decoded.userId;
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Invalid or expired token',
      code: 'INVALID_TOKEN'
    });
  }
};

/**
 * Generates JWT token for user
 * @param userId - User's unique identifier
 * @param userEmail - User's email address
 * @returns Signed JWT token (expires in 24 hours)
 */
export const generateToken = (userId: string, userEmail: string): string => {
  return jwt.sign(
    { userId, email: userEmail },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export { JWT_SECRET };
