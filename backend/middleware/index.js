const validateRequest = require('./validateRequest');
const auth = require('./auth');
const { admin, resourceOwnerOrAdmin } = require('./admin');
const errorHandler = require('./errorHandler');
const { sqlInjectionProtection } = require('./sqlInjectionProtection');

module.exports = {
  // Request validation middleware
  validateRequest,
  
  // Authentication and authorization
  auth,
  admin,
  resourceOwnerOrAdmin,
  
  // Error handling
  errorHandler,
  
  // Security middleware
  sqlInjectionProtection
}; 