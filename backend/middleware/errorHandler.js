/**
 * Global error handling middleware
 * This should be added at the end of your Express app
 * 
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {void}
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  // Check if headers have already been sent
  if (res.headersSent) {
    return next(err);
  }
  
  // Check for known error types and handle them appropriately
  
  // MongoDB validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => ({
      message: error.message,
      path: error.path,
      type: error.kind
    }));
    
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors
    });
  }
  
  // MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      status: 'error',
      message: 'Duplicate key error',
      field: Object.keys(err.keyValue)[0]
    });
  }
  
  // JWT authentication error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }
  
  // JWT token expired
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Token expired'
    });
  }
  
  // Custom application error
  if (err.isOperational) {
    return res.status(err.statusCode || 400).json({
      status: 'error',
      message: err.message
    });
  }
  
  // Unknown error - don't leak error details in production
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message || 'Internal server error';
  
  res.status(statusCode).json({
    status: 'error',
    message
  });
  
  // If we're in development, we might want to send more details
  if (process.env.NODE_ENV !== 'production') {
    console.error('Stack trace:', err.stack);
  }
};

module.exports = errorHandler; 