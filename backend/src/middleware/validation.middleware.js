/**
 * Input validation middleware
 * This middleware provides functions to validate request data 
 * and protect against injection attacks and invalid inputs
 */

// Sanitize string inputs
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  // Remove potential script tags
  return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[^\w\s.,'\-@:/&+]/gi, ''); // Remove special characters that could be used for injection
};

// Validate ID formats
const isValidId = (id) => {
  // Check if it's a valid UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

// Sanitize a single value based on its type
const sanitizeValue = (value) => {
  if (typeof value === 'string') {
    return sanitizeString(value);
  } else if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  } else if (value && typeof value === 'object') {
    const sanitized = {};
    for (const key in value) {
      sanitized[key] = sanitizeValue(value[key]);
    }
    return sanitized;
  }
  return value;
};

// Validation middleware for request body
exports.validateRequestBody = (schema) => {
  return (req, res, next) => {
    // Sanitize all inputs in the request body
    req.body = sanitizeValue(req.body);
    
    if (schema) {
      try {
        // Use the schema to validate
        const { error } = schema.validate(req.body);
        if (error) {
          return res.status(400).json({
            message: 'Validation error',
            details: error.details.map(d => d.message)
          });
        }
      } catch (err) {
        return res.status(500).json({
          message: 'Validation error processing'
        });
      }
    }
    
    next();
  };
};

// Validation middleware for request parameters
exports.validateParamId = (req, res, next) => {
  const id = req.params.id;
  
  if (!id || !isValidId(id)) {
    return res.status(400).json({
      message: 'Invalid ID format'
    });
  }
  
  next();
};

// Export utility functions for direct use
exports.sanitizeString = sanitizeString;
exports.isValidId = isValidId;

/**
 * Request validation middleware using Joi
 * Validates request body, query parameters, and URL parameters against schemas
 */

const createValidationMiddleware = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    
    if (!error) {
      return next();
    }
    
    const errors = error.details.map(detail => ({
      message: detail.message,
      path: detail.path,
      type: detail.type
    }));
    
    return res.status(400).json({
      message: 'Validation error',
      errors
    });
  };
};

/**
 * Validates request body
 * @param {Object} schema - Joi schema for validation
 * @returns {Function} Express middleware
 */
const validateBody = schema => createValidationMiddleware(schema, 'body');

/**
 * Validates request query parameters
 * @param {Object} schema - Joi schema for validation
 * @returns {Function} Express middleware
 */
const validateQuery = schema => createValidationMiddleware(schema, 'query');

/**
 * Validates request URL parameters
 * @param {Object} schema - Joi schema for validation
 * @returns {Function} Express middleware
 */
const validateParams = schema => createValidationMiddleware(schema, 'params');

module.exports = {
  validateBody,
  validateQuery,
  validateParams
}; 