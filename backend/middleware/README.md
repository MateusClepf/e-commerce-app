# API Middleware System

This directory contains middleware functions used throughout the application's API. Middleware functions are used to handle common tasks like request validation, authentication, error handling, and more.

## Available Middleware

### validateRequest.js

Middleware for validating incoming request data against Joi schemas. This ensures that only valid data is processed by the route handlers.

Usage:

```javascript
const validateRequest = require('./middleware/validateRequest');
const { createProductSchema } = require('./validation/productValidation');

router.post('/products', validateRequest(createProductSchema), productController.createProduct);
```

See the [validation README](../validation/README.md) for more details on validation schemas.

### auth.js

Middleware for authenticating API requests. This middleware verifies that the request includes a valid authentication token.

Usage:

```javascript
const auth = require('./middleware/auth');

// Protected route that requires authentication
router.get('/profile', auth, userController.getProfile);
```

### admin.js

Middleware for checking if the authenticated user has admin privileges. This middleware should be used after the `auth` middleware.

Usage:

```javascript
const auth = require('./middleware/auth');
const admin = require('./middleware/admin');

// Protected route that requires admin privileges
router.post('/products', auth, admin, productController.createProduct);
```

### errorHandler.js

Global error handling middleware that catches unhandled errors and sends appropriate responses.

Usage:

```javascript
const errorHandler = require('./middleware/errorHandler');

// Add at the end of your Express app
app.use(errorHandler);
```

## Creating New Middleware

To create a new middleware:

1. Create a new file in the `middleware` directory
2. Define your middleware function
3. Export the function

Example:

```javascript
/**
 * Rate limiting middleware
 * 
 * @param {Object} options - Rate limiting options
 * @returns {Function} Express middleware function
 */
const rateLimit = (options = {}) => {
  const { max = 100, windowMs = 60 * 60 * 1000 } = options;
  
  // Middleware implementation
  return (req, res, next) => {
    // ... implementation
    next();
  };
};

module.exports = rateLimit;
```

## Middleware Chain

Middleware functions are executed in the order they are added to the route. For example:

```javascript
router.post('/products', 
  auth,                              // 1. Check if user is authenticated
  admin,                             // 2. Check if user is an admin
  validateRequest(createProductSchema), // 3. Validate request data
  productController.createProduct    // 4. Handle the request
);
```

This order matters! For example, checking if a user is an admin should happen after authentication, since you need to know who the user is first. 