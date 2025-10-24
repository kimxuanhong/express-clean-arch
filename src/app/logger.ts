import { createLogger, format, transports } from 'winston';

/**
 * @fileoverview Logger Configuration - Winston logger setup
 */

const logger = createLogger({
  level: process.env['LOG_LEVEL'] || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [new transports.Console({ stderrLevels: ['error'] })]
});

export default logger;
