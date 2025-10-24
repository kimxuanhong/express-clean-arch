import { Request, Response, NextFunction } from 'express';

// Express types
export interface ExpressRequest extends Request {}
export interface ExpressResponse extends Response {}
export interface ExpressNextFunction extends NextFunction {}

// Error types
export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

// JWT types
export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}
