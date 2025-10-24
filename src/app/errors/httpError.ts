import { AppError } from '../types';

/**
 * @fileoverview HTTP Error - Custom HTTP error class
 */

/**
 * HTTP Error class
 * @class
 * @extends Error
 */
export class HttpError extends Error implements AppError {
  public statusCode: number;
  public isOperational: boolean;

  /**
   * Creates an HTTP Error instance
   * @constructor
   * @param statusCode - HTTP status code
   * @param message - Error message
   */
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.name = 'HttpError';
    
    Error.captureStackTrace(this, this.constructor);
  }
}
