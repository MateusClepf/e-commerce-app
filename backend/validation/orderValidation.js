const Joi = require('joi');

// Schema for creating a new order
const createOrderSchema = Joi.object({
  userId: Joi.string().required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.empty': 'User ID is required',
      'any.required': 'User ID is required'
    }),
    
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().required()
        .messages({
          'string.base': 'Product ID must be a string',
          'string.empty': 'Product ID is required',
          'any.required': 'Product ID is required'
        }),
      quantity: Joi.number().integer().min(1).required()
        .messages({
          'number.base': 'Quantity must be a number',
          'number.integer': 'Quantity must be an integer',
          'number.min': 'Quantity must be at least 1',
          'any.required': 'Quantity is required'
        }),
      price: Joi.number().precision(2).positive().required()
        .messages({
          'number.base': 'Price must be a number',
          'number.positive': 'Price must be greater than 0',
          'number.precision': 'Price cannot have more than 2 decimal places',
          'any.required': 'Price is required'
        }),
      variant: Joi.object({
        name: Joi.string().required(),
        option: Joi.string().required()
      }).optional()
    })
  ).min(1).required()
    .messages({
      'array.base': 'Items must be an array',
      'array.min': 'At least one item is required',
      'any.required': 'At least one item is required'
    }),
    
  shippingAddress: Joi.object({
    fullName: Joi.string().min(3).max(100).required()
      .messages({
        'string.base': 'Full name must be a string',
        'string.min': 'Full name must be at least 3 characters',
        'string.max': 'Full name cannot exceed 100 characters',
        'string.empty': 'Full name is required',
        'any.required': 'Full name is required'
      }),
    addressLine1: Joi.string().min(5).max(100).required()
      .messages({
        'string.base': 'Address line 1 must be a string',
        'string.min': 'Address line 1 must be at least 5 characters',
        'string.max': 'Address line 1 cannot exceed 100 characters',
        'string.empty': 'Address line 1 is required',
        'any.required': 'Address line 1 is required'
      }),
    addressLine2: Joi.string().max(100).allow('').optional()
      .messages({
        'string.base': 'Address line 2 must be a string',
        'string.max': 'Address line 2 cannot exceed 100 characters'
      }),
    city: Joi.string().min(2).max(50).required()
      .messages({
        'string.base': 'City must be a string',
        'string.min': 'City must be at least 2 characters',
        'string.max': 'City cannot exceed 50 characters',
        'string.empty': 'City is required',
        'any.required': 'City is required'
      }),
    state: Joi.string().min(2).max(50).required()
      .messages({
        'string.base': 'State must be a string',
        'string.min': 'State must be at least 2 characters',
        'string.max': 'State cannot exceed 50 characters',
        'string.empty': 'State is required',
        'any.required': 'State is required'
      }),
    postalCode: Joi.string().min(3).max(20).required()
      .messages({
        'string.base': 'Postal code must be a string',
        'string.min': 'Postal code must be at least 3 characters',
        'string.max': 'Postal code cannot exceed 20 characters',
        'string.empty': 'Postal code is required',
        'any.required': 'Postal code is required'
      }),
    country: Joi.string().min(2).max(50).required()
      .messages({
        'string.base': 'Country must be a string',
        'string.min': 'Country must be at least 2 characters',
        'string.max': 'Country cannot exceed 50 characters',
        'string.empty': 'Country is required',
        'any.required': 'Country is required'
      }),
    phone: Joi.string().pattern(/^[0-9+\-\s()]{7,20}$/).required()
      .messages({
        'string.base': 'Phone must be a string',
        'string.pattern.base': 'Phone number must be valid',
        'string.empty': 'Phone is required',
        'any.required': 'Phone is required'
      })
  }).required()
    .messages({
      'object.base': 'Shipping address must be an object',
      'any.required': 'Shipping address is required'
    }),
    
  billingAddress: Joi.object({
    fullName: Joi.string().min(3).max(100).required(),
    addressLine1: Joi.string().min(5).max(100).required(),
    addressLine2: Joi.string().max(100).allow('').optional(),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).required(),
    postalCode: Joi.string().min(3).max(20).required(),
    country: Joi.string().min(2).max(50).required(),
    phone: Joi.string().pattern(/^[0-9+\-\s()]{7,20}$/).required()
  }).optional()
    .messages({
      'object.base': 'Billing address must be an object'
    }),
    
  paymentMethod: Joi.string().valid('credit_card', 'paypal', 'stripe', 'bank_transfer').required()
    .messages({
      'string.base': 'Payment method must be a string',
      'string.empty': 'Payment method is required',
      'any.required': 'Payment method is required',
      'any.only': 'Payment method must be one of: credit_card, paypal, stripe, bank_transfer'
    }),
    
  paymentDetails: Joi.object().required()
    .messages({
      'object.base': 'Payment details must be an object',
      'any.required': 'Payment details are required'
    }),
    
  subtotal: Joi.number().precision(2).positive().required()
    .messages({
      'number.base': 'Subtotal must be a number',
      'number.positive': 'Subtotal must be greater than 0',
      'number.precision': 'Subtotal cannot have more than 2 decimal places',
      'any.required': 'Subtotal is required'
    }),
    
  tax: Joi.number().precision(2).min(0).required()
    .messages({
      'number.base': 'Tax must be a number',
      'number.min': 'Tax cannot be negative',
      'number.precision': 'Tax cannot have more than 2 decimal places',
      'any.required': 'Tax is required'
    }),
    
  shippingCost: Joi.number().precision(2).min(0).required()
    .messages({
      'number.base': 'Shipping cost must be a number',
      'number.min': 'Shipping cost cannot be negative',
      'number.precision': 'Shipping cost cannot have more than 2 decimal places',
      'any.required': 'Shipping cost is required'
    }),
    
  discount: Joi.number().precision(2).min(0).default(0)
    .messages({
      'number.base': 'Discount must be a number',
      'number.min': 'Discount cannot be negative',
      'number.precision': 'Discount cannot have more than 2 decimal places'
    }),
    
  total: Joi.number().precision(2).positive().required()
    .messages({
      'number.base': 'Total must be a number',
      'number.positive': 'Total must be greater than 0',
      'number.precision': 'Total cannot have more than 2 decimal places',
      'any.required': 'Total is required'
    }),
    
  couponCode: Joi.string().allow('').optional()
    .messages({
      'string.base': 'Coupon code must be a string'
    }),
    
  notes: Joi.string().max(500).allow('').optional()
    .messages({
      'string.base': 'Notes must be a string',
      'string.max': 'Notes cannot exceed 500 characters'
    })
});

// Schema for updating an existing order
const updateOrderSchema = Joi.object({
  status: Joi.string().valid(
    'pending', 
    'processing', 
    'shipped', 
    'delivered', 
    'cancelled', 
    'refunded'
  ).required()
    .messages({
      'string.base': 'Status must be a string',
      'string.empty': 'Status is required',
      'any.required': 'Status is required',
      'any.only': 'Status must be one of: pending, processing, shipped, delivered, cancelled, refunded'
    }),
    
  trackingNumber: Joi.string().allow('').optional()
    .messages({
      'string.base': 'Tracking number must be a string'
    }),
    
  shippingProvider: Joi.string().allow('').optional()
    .messages({
      'string.base': 'Shipping provider must be a string'
    }),
    
  notes: Joi.string().max(500).allow('').optional()
    .messages({
      'string.base': 'Notes must be a string',
      'string.max': 'Notes cannot exceed 500 characters'
    })
});

// Schema for validating order ID in route parameters
const orderIdSchema = Joi.object({
  id: Joi.string().required()
    .messages({
      'string.base': 'Order ID must be a string',
      'string.empty': 'Order ID is required',
      'any.required': 'Order ID is required'
    })
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  orderIdSchema
}; 