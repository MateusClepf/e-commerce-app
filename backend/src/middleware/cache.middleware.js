const redisCache = require('express-redis-cache');

// Create a cache client
// In production, we would use actual Redis connection details
// For development, we'll use a memory cache
const cache = process.env.NODE_ENV === 'production' || process.env.REDIS_HOST
  ? redisCache({
      host: process.env.REDIS_HOST || 'redis',  // use 'redis' as default (container name)
      port: process.env.REDIS_PORT || 6379,
      expire: process.env.CACHE_EXPIRE || 300 // 5 minutes default
    })
  : redisCache({
      expire: 300 // 5 minutes
    });

// Cache middleware with configurable duration
exports.cacheResponse = (name, duration = 300) => {
  return (req, res, next) => {
    // Skip caching for non-GET methods or if explicitly requested with cache-control
    if (req.method !== 'GET' || req.headers['cache-control'] === 'no-cache') {
      return next();
    }
    
    // Create a cache key based on the route name and query parameters
    let key = `${name}`;
    if (Object.keys(req.query).length > 0) {
      key += `:${JSON.stringify(req.query)}`;
    }
    
    // Apply cache with custom duration
    cache.route({
      name: key,
      expire: duration
    })(req, res, next);
  };
};

// Middleware to clear cache for specific routes
exports.clearCache = (patterns) => {
  return (req, res, next) => {
    if (!Array.isArray(patterns)) {
      patterns = [patterns];
    }
    
    patterns.forEach(pattern => {
      cache.del(pattern, (err) => {
        if (err) console.error(`Error clearing cache for ${pattern}:`, err);
      });
    });
    
    next();
  };
};

// Export the cache instance for direct access
exports.cache = cache; 