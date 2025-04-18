/**
 * Rate limiting middleware to prevent abuse
 * Implements a simple in-memory store for rate limiting
 */

// Simple in-memory store for rate limiting
const ipRequests = new Map();

// Clean up old requests every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, requests] of ipRequests.entries()) {
    // Remove requests older than window (default 15 minutes)
    const filteredRequests = requests.filter(timestamp => 
      now - timestamp < 15 * 60 * 1000
    );
    
    if (filteredRequests.length === 0) {
      ipRequests.delete(ip);
    } else {
      ipRequests.set(ip, filteredRequests);
    }
  }
}, 10 * 60 * 1000);

/**
 * Rate limiting middleware
 * @param {Object} options - Configuration options
 * @param {number} options.maxRequests - Maximum number of requests allowed in the window (default: 100)
 * @param {number} options.windowMs - Time window in milliseconds (default: 15 minutes)
 * @returns {Function} Express middleware
 */
const rateLimit = (options = {}) => {
  const { 
    maxRequests = 100, 
    windowMs = 15 * 60 * 1000  // 15 minutes by default
  } = options;

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    
    // Skip rate limiting for local development
    if (process.env.NODE_ENV === 'development' && 
        (ip === '127.0.0.1' || ip === '::1')) {
      return next();
    }
    
    // Get current requests for this IP
    const requests = ipRequests.get(ip) || [];
    const now = Date.now();
    
    // Filter out requests older than the window
    const recentRequests = requests.filter(timestamp => 
      now - timestamp < windowMs
    );
    
    // Check if the IP has exceeded the rate limit
    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        message: 'Too many requests, please try again later',
        retryAfter: Math.ceil(windowMs / 1000 / 60) // minutes
      });
    }
    
    // Add current request timestamp
    recentRequests.push(now);
    ipRequests.set(ip, recentRequests);
    
    // Set headers
    res.set('X-RateLimit-Limit', maxRequests);
    res.set('X-RateLimit-Remaining', maxRequests - recentRequests.length);
    
    next();
  };
};

// Stricter rate limit for sensitive operations like login
const loginRateLimit = rateLimit({
  maxRequests: 5,
  windowMs: 5 * 60 * 1000 // 5 minutes
});

// Standard API rate limit
const apiRateLimit = rateLimit();

module.exports = {
  rateLimit,
  loginRateLimit,
  apiRateLimit
}; 