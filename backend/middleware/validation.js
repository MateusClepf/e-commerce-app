const Joi = require('joi');

/**
 * Middleware factory for validating request inputs using Joi schemas
 * @param {Object} schema - Joi schema for validation
 * @param {string} property - Request property to validate ('body', 'query', or 'params')
 * @returns {Function} Express middleware function
 */
const validate = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { 
      abortEarly: false,
      stripUnknown: true 
    });
    
    if (!error) {
      return next();
    }
    
    const errors = error.details.map(detail => ({
      message: detail.message,
      path: detail.path
    }));
    
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors
    });
  };
};

// Middleware factory functions for different request properties
const validateBody = (schema) => validate(schema, 'body');
const validateQuery = (schema) => validate(schema, 'query');
const validateParams = (schema) => validate(schema, 'params');

module.exports = {
  validateBody,
  validateQuery,
  validateParams
}; 