/**
 * Authentication and authorization middleware
 * Verifies JWT tokens and checks user roles for protected routes
 */

const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

/**
 * Verifies that a valid JWT token is present in the request header
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

/**
 * Verifies that the user has admin role
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const isAdmin = async (req, res, next) => {
  try {
    // First ensure the user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required' });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Checks if the user has any of the specified roles
 * @param {Array<string>} roles - Array of role names
 * @returns {Function} Express middleware
 */
const hasRoles = (roles) => {
  return async (req, res, next) => {
    try {
      // First ensure the user is authenticated
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Authentication required' });
      }
      
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      if (!roles.includes(user.role)) {
        return res.status(403).json({ 
          message: `Access denied. Required roles: ${roles.join(', ')}` 
        });
      }
      
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
};

/**
 * Verifies the user owns the requested resource or is an admin
 * @param {Function} getResourceUserId - Function to extract owner ID from the request
 * @returns {Function} Express middleware
 */
const isResourceOwnerOrAdmin = (getResourceUserId) => {
  return async (req, res, next) => {
    try {
      // First ensure the user is authenticated
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Authentication required' });
      }
      
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Admins can access any resource
      if (user.role === 'admin') {
        return next();
      }
      
      // Get the resource owner ID using the provided function
      const resourceUserId = await getResourceUserId(req);
      
      // Check if the user is the resource owner
      if (resourceUserId && resourceUserId.toString() === req.user.id) {
        return next();
      }
      
      return res.status(403).json({ message: 'Access denied. You do not own this resource' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
};

module.exports = {
  verifyToken,
  isAdmin,
  hasRoles,
  isResourceOwnerOrAdmin
}; 