/**
 * Middleware to validate request data against a Joi schema
 * 
 * @param {Object} schema - Joi schema to validate against
 * @param {String} property - Request property to validate (body, params, query)
 * @returns {Function} Express middleware function
 */
const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    if (!schema) {
      return next();
    }

    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true
    });

    if (error) {
      const errorMessages = error.details.map(detail => ({
        message: detail.message,
        path: detail.path,
        type: detail.type
      }));

      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: errorMessages
      });
    }

    // Replace request data with validated data
    req[property] = value;
    return next();
  };
};

module.exports = validateRequest; 