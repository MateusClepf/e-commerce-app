/**
 * Request validation middleware
 * 
 * This middleware validates the request payload against a given schema
 * and returns appropriate error messages if validation fails.
 */

const validateRequest = (schema) => {
  return (req, res, next) => {
    // Validate request body against schema
    const { error } = schema.validate(req.body, { 
      abortEarly: false, // Return all errors, not just the first one
      allowUnknown: true, // Allow unknown keys that will be ignored
      stripUnknown: false // Don't remove unknown elements from objects
    });

    // If validation error exists
    if (error) {
      const errorDetails = error.details.map(detail => ({
        message: detail.message,
        path: detail.path,
        type: detail.type
      }));
      
      // Return error response
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errorDetails
      });
    }

    // Validation passed, proceed to the next middleware/controller
    next();
  };
};

module.exports = validateRequest; 