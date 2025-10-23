/**
 * @fileoverview Request Validation Middleware - Validates incoming request body
 */

const { validationResult } = require('express-validator');

/**
 * Handles validation errors from express-validator
 * @middleware
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body to validate
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends 400 if validation fails, otherwise calls next()
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

module.exports = handleValidationErrors;
