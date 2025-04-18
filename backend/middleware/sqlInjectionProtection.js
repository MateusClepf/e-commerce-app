/**
 * SQL Injection Protection Middleware
 * 
 * This middleware adds an extra layer of protection against SQL injection attacks.
 * While Sequelize provides SQL injection protection through parameterized queries,
 * this middleware adds additional checks for suspicious input patterns.
 */

/**
 * Check if a string may contain SQL injection patterns
 * @param {string} value - The string to check
 * @returns {boolean} true if suspicious pattern is found
 */
const hasSqlInjectionPattern = (value) => {
  if (typeof value !== 'string') return false;
  
  // Common SQL injection patterns
  const patterns = [
    // Basic SQL injection
    /'\s*OR\s*'1'\s*=\s*'1/i,
    /'\s*OR\s*1\s*=\s*1/i,
    /'\s*OR\s*'\w+'\s*=\s*'\w+/i,
    
    // SQL comments
    /--\s/,
    /\/\*.*\*\//,
    
    // UNION-based attacks
    /UNION\s+ALL\s+SELECT/i,
    /UNION\s+SELECT/i,
    
    // Other SQL keywords that are suspicious in user input
    /\bDROP\s+TABLE\b/i,
    /\bALTER\s+TABLE\b/i,
    /\bDELETE\s+FROM\b/i,
    /\bINSERT\s+INTO\b/i,
    /\bUPDATE\s+\w+\s+SET\b/i,
    /\bEXEC\b/i,
    /\bEXECUTE\b/i
  ];
  
  return patterns.some(pattern => pattern.test(value));
};

/**
 * Recursively sanitize an object or array for SQL injection patterns
 * @param {Object|Array} data - The data to check
 * @returns {Object} Object with validation results
 */
const checkForSqlInjection = (data) => {
  const suspiciousFields = [];
  
  const inspect = (obj, path = '') => {
    if (!obj || typeof obj !== 'object') return;
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string' && hasSqlInjectionPattern(value)) {
        suspiciousFields.push({
          path: currentPath,
          value: value
        });
      } else if (value && typeof value === 'object') {
        // Recursively check nested objects and arrays
        inspect(value, currentPath);
      }
    });
  };
  
  inspect(data);
  
  return {
    hasSuspiciousPatterns: suspiciousFields.length > 0,
    suspiciousFields
  };
};

/**
 * Middleware to check request for potential SQL injection
 * @param {Object} options - Configuration options
 * @returns {Function} Express middleware function
 */
const sqlInjectionProtection = (options = {}) => {
  const defaultOptions = {
    checkBody: true,
    checkQuery: true,
    checkParams: true,
    logOnly: false, // Set to true to only log issues without blocking
    blockLevel: 'suspicious' // 'suspicious' or 'all'
  };
  
  const config = { ...defaultOptions, ...options };
  
  return (req, res, next) => {
    const results = {
      body: config.checkBody ? checkForSqlInjection(req.body) : { hasSuspiciousPatterns: false },
      query: config.checkQuery ? checkForSqlInjection(req.query) : { hasSuspiciousPatterns: false },
      params: config.checkParams ? checkForSqlInjection(req.params) : { hasSuspiciousPatterns: false }
    };
    
    const hasSuspiciousPatterns = 
      results.body.hasSuspiciousPatterns || 
      results.query.hasSuspiciousPatterns || 
      results.params.hasSuspiciousPatterns;
    
    if (hasSuspiciousPatterns) {
      // Collect suspicious fields from all sources
      const allSuspiciousFields = [
        ...results.body.suspiciousFields.map(f => ({ source: 'body', ...f })),
        ...results.query.suspiciousFields.map(f => ({ source: 'query', ...f })),
        ...results.params.suspiciousFields.map(f => ({ source: 'params', ...f }))
      ];
      
      // Log the potential SQL injection attempt
      console.warn('Potential SQL injection attempt detected:', {
        ip: req.ip,
        path: req.path,
        method: req.method,
        suspiciousFields: allSuspiciousFields,
        timestamp: new Date().toISOString()
      });
      
      // If not in log-only mode, block the request
      if (!config.logOnly) {
        return res.status(403).json({
          status: 'error',
          message: 'Request contains potentially harmful patterns and was blocked'
        });
      }
    }
    
    next();
  };
};

module.exports = {
  sqlInjectionProtection,
  checkForSqlInjection,
  hasSqlInjectionPattern
}; 