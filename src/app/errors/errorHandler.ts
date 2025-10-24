import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types';

/**
 * @fileoverview Error Handler - Global error handling middleware
 */

/**
 * Global error handler middleware
 * @param err - Error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export function errorHandler(err: AppError, _req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    next(err);
    return;
  }
  
  const status = err.statusCode || 500;
  res.status(status).json({ 
    error: err.message || 'Internal error',
    ...(process.env['NODE_ENV'] === 'development' && { stack: err.stack })
  });
}
