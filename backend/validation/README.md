# API Validation System

This directory contains validation schemas for the application's API endpoints. These schemas are used to validate incoming request data before it reaches the route handlers, ensuring that only valid data is processed.

## Overview

The validation system uses [Joi](https://joi.dev/) to define schemas for different types of data. Each schema specifies the expected structure and validation rules for a particular API endpoint.

## Available Schemas

- **User Validation**: Schemas for user registration, login, password reset, and profile updates
- **Category Validation**: Schemas for creating and updating product categories
- **Product Validation**: Schemas for creating and updating products
- **Order Validation**: Schemas for creating and updating orders
- **Review Validation**: Schemas for creating and updating product reviews
- **Coupon Validation**: Schemas for creating and updating promotional coupons

## How to Use

### Importing Validation Schemas

You can import the validation schemas either individually or all at once:

```javascript
// Import specific schemas from individual files
const { registerSchema, loginSchema } = require('../validation/userValidation');

// Or import all schemas at once from the index file
const { 
  registerSchema, 
  createProductSchema, 
  createCategorySchema 
} = require('../validation');
```

### Using with Express Routes

The validation schemas are used together with the `validateRequest` middleware:

```javascript
const express = require('express');
const router = express.Router();
const { registerSchema } = require('../validation/userValidation');
const validateRequest = require('../middleware/validateRequest');

// Apply validation to a route
router.post('/register', validateRequest(registerSchema), userController.register);
```

### Validation Different Parts of the Request

By default, the `validateRequest` middleware validates the request body. You can specify a different part of the request to validate:

```javascript
// Validate URL parameters
router.get('/:id', validateRequest(productIdSchema, 'params'), productController.getProductById);

// Validate query parameters
router.get('/search', validateRequest(searchQuerySchema, 'query'), productController.searchProducts);
```

## Structure of Validation Error Responses

When validation fails, the middleware will return a 400 Bad Request response with details about the validation errors:

```json
{
  "status": "error",
  "message": "Validation error",
  "errors": [
    {
      "message": "\"email\" must be a valid email",
      "path": ["email"],
      "type": "string.email"
    },
    {
      "message": "\"password\" length must be at least 8 characters long",
      "path": ["password"],
      "type": "string.min"
    }
  ]
}
```

## Creating New Validation Schemas

To create a new validation schema:

1. Create a new file in the `validation` directory if it doesn't already exist for your entity
2. Define your schemas using Joi
3. Export the schemas
4. Add them to the `index.js` export

Example:

```javascript
const Joi = require('joi');

const myNewSchema = Joi.object({
  field1: Joi.string().required(),
  field2: Joi.number().min(1).required()
});

module.exports = {
  myNewSchema
};
```

Then update `index.js`:

```javascript
const myNewValidation = require('./myNewValidation');

module.exports = {
  // ... existing exports
  ...myNewValidation
};
```

## Updating Schemas

When updating schemas, ensure that you consider backward compatibility with existing clients. If you need to make breaking changes, consider versioning your API endpoints. 