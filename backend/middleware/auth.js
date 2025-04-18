const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate users based on JWT token
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {void}
 */
const auth = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Access denied. No token provided or invalid format'
    });
  }
  
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Access denied. No token provided'
    });
  }
  
  try {
    // Verify token using environment variable for secret
    // This makes it more secure by not hardcoding the secret
    const JWT_SECRET = process.env.JWT_SECRET;
    
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
      return res.status(500).json({
        status: 'error',
        message: 'Internal server configuration error'
      });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if token has expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(401).json({
        status: 'error',
        message: 'Token has expired'
      });
    }
    
    // Add user from payload to request
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    
    // Provide specific error messages for different JWT errors
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token'
      });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token has expired'
      });
    }
    
    res.status(401).json({
      status: 'error',
      message: 'Token validation failed'
    });
  }
};

module.exports = auth; 