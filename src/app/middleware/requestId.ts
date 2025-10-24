import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * @fileoverview Request ID Middleware - Adds unique request ID to requests
 */

/**
 * Request ID middleware
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const incoming = req.headers['x-request-id'] || req.headers['x-correlation-id'];
  const id = (incoming as string) || uuidv4();
  (req as any).requestId = id;
  res.setHeader('X-Request-Id', id);
  next();
}
