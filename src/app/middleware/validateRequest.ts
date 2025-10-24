import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * @fileoverview Request Validation Middleware - Validates incoming request body
 */

/**
 * Handles validation errors from express-validator
 * @middleware
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 * @returns void Sends 400 if validation fails, otherwise calls next()
 */
export function handleValidationErrors(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: 'path' in err ? err.path : 'unknown',
        message: err.msg
      }))
    });
    return;
  }
  next();
}
