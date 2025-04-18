/**
 * Middleware to check if user has admin privileges
 * This middleware should be used after the auth middleware
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {void}
 */
const admin = (req, res, next) => {
  // Ensure user exists (should be set by auth middleware)
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication required'
    });
  }
  
  try {
    // Check if user has admin role
    // Using a strict boolean comparison for additional security
    if (req.user.role !== 'admin' && req.user.isAdmin !== true) {
      // Log unauthorized admin access attempt for security monitoring
      console.warn(`Admin access attempt by non-admin user: ${req.user.id}`);
      
      // Return a 403 Forbidden response
      return res.status(403).json({
        status: 'error',
        message: 'Access denied: Admin privileges required'
      });
    }
    
    // Add an admin flag to request for downstream middleware/controllers
    req.isAdmin = true;
    
    // User has admin privileges, proceed
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error while verifying admin privileges'
    });
  }
};

/**
 * Middleware to check if user is the resource owner or an admin
 * This should be used after the auth middleware
 * 
 * @param {Function} getUserIdFromResource - Function to extract the owner ID from the request
 * @returns {Function} Middleware function
 */
const resourceOwnerOrAdmin = (getUserIdFromResource) => {
  return async (req, res, next) => {
    try {
      // Ensure user exists (should be set by auth middleware)
      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: 'Authentication required'
        });
      }
      
      // If user is admin, allow access
      if (req.user.role === 'admin' || req.user.isAdmin === true) {
        req.isAdmin = true;
        return next();
      }
      
      // Get the resource owner ID using the provided function
      const ownerId = await getUserIdFromResource(req);
      
      // If no owner ID found or doesn't match the current user
      if (!ownerId || ownerId !== req.user.id.toString()) {
        console.warn(`Unauthorized resource access attempt by user: ${req.user.id}`);
        return res.status(403).json({
          status: 'error',
          message: 'Access denied: You do not own this resource'
        });
      }
      
      // User is the resource owner, proceed
      next();
    } catch (error) {
      console.error('Resource owner check error:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Server error while verifying resource ownership'
      });
    }
  };
};

module.exports = {
  admin,
  resourceOwnerOrAdmin
}; 