const Joi = require('joi');

// Schema for creating a new coupon
const createCouponSchema = Joi.object({
  code: Joi.string().pattern(/^[A-Z0-9_-]{3,20}$/).required()
    .messages({
      'string.base': 'Coupon code must be a string',
      'string.empty': 'Coupon code is required',
      'string.pattern.base': 'Coupon code must contain 3-20 uppercase letters, numbers, hyphens, or underscores',
      'any.required': 'Coupon code is required'
    }),
    
  type: Joi.string().valid('percentage', 'fixed_amount', 'free_shipping').required()
    .messages({
      'string.base': 'Coupon type must be a string',
      'string.empty': 'Coupon type is required',
      'any.only': 'Coupon type must be one of: percentage, fixed_amount, free_shipping',
      'any.required': 'Coupon type is required'
    }),
    
  value: Joi.number().precision(2).min(0).required()
    .messages({
      'number.base': 'Coupon value must be a number',
      'number.min': 'Coupon value cannot be negative',
      'number.precision': 'Coupon value cannot have more than 2 decimal places',
      'any.required': 'Coupon value is required'
    }),
    
  minimumPurchase: Joi.number().precision(2).min(0).default(0)
    .messages({
      'number.base': 'Minimum purchase must be a number',
      'number.min': 'Minimum purchase cannot be negative',
      'number.precision': 'Minimum purchase cannot have more than 2 decimal places'
    }),
    
  startDate: Joi.date().iso().required()
    .messages({
      'date.base': 'Start date must be a valid date',
      'date.format': 'Start date must be in ISO format (YYYY-MM-DD)',
      'any.required': 'Start date is required'
    }),
    
  endDate: Joi.date().iso().min(Joi.ref('startDate')).required()
    .messages({
      'date.base': 'End date must be a valid date',
      'date.format': 'End date must be in ISO format (YYYY-MM-DD)',
      'date.min': 'End date must be after start date',
      'any.required': 'End date is required'
    }),
    
  maxUses: Joi.number().integer().min(1).optional()
    .messages({
      'number.base': 'Max uses must be a number',
      'number.integer': 'Max uses must be an integer',
      'number.min': 'Max uses must be at least 1'
    }),
    
  usesPerCustomer: Joi.number().integer().min(1).default(1)
    .messages({
      'number.base': 'Uses per customer must be a number',
      'number.integer': 'Uses per customer must be an integer',
      'number.min': 'Uses per customer must be at least 1'
    }),
    
  description: Joi.string().max(200).optional()
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot exceed 200 characters'
    }),
    
  isActive: Joi.boolean().default(true)
    .messages({
      'boolean.base': 'isActive must be a boolean value'
    }),
    
  applicableProducts: Joi.array().items(Joi.string()).optional()
    .messages({
      'array.base': 'Applicable products must be an array',
      'string.base': 'Each product ID must be a string'
    }),
    
  applicableCategories: Joi.array().items(Joi.string()).optional()
    .messages({
      'array.base': 'Applicable categories must be an array',
      'string.base': 'Each category ID must be a string'
    }),
    
  excludedProducts: Joi.array().items(Joi.string()).optional()
    .messages({
      'array.base': 'Excluded products must be an array',
      'string.base': 'Each product ID must be a string'
    }),
    
  minItems: Joi.number().integer().min(1).optional()
    .messages({
      'number.base': 'Minimum items must be a number',
      'number.integer': 'Minimum items must be an integer',
      'number.min': 'Minimum items must be at least 1'
    }),
    
  firstTimeCustomersOnly: Joi.boolean().default(false)
    .messages({
      'boolean.base': 'firstTimeCustomersOnly must be a boolean value'
    })
});

// Schema for updating an existing coupon
const updateCouponSchema = Joi.object({
  type: Joi.string().valid('percentage', 'fixed_amount', 'free_shipping')
    .messages({
      'string.base': 'Coupon type must be a string',
      'any.only': 'Coupon type must be one of: percentage, fixed_amount, free_shipping'
    }),
    
  value: Joi.number().precision(2).min(0)
    .messages({
      'number.base': 'Coupon value must be a number',
      'number.min': 'Coupon value cannot be negative',
      'number.precision': 'Coupon value cannot have more than 2 decimal places'
    }),
    
  minimumPurchase: Joi.number().precision(2).min(0)
    .messages({
      'number.base': 'Minimum purchase must be a number',
      'number.min': 'Minimum purchase cannot be negative',
      'number.precision': 'Minimum purchase cannot have more than 2 decimal places'
    }),
    
  startDate: Joi.date().iso()
    .messages({
      'date.base': 'Start date must be a valid date',
      'date.format': 'Start date must be in ISO format (YYYY-MM-DD)'
    }),
    
  endDate: Joi.date().iso().min(Joi.ref('startDate'))
    .messages({
      'date.base': 'End date must be a valid date',
      'date.format': 'End date must be in ISO format (YYYY-MM-DD)',
      'date.min': 'End date must be after start date'
    }),
    
  maxUses: Joi.number().integer().min(1)
    .messages({
      'number.base': 'Max uses must be a number',
      'number.integer': 'Max uses must be an integer',
      'number.min': 'Max uses must be at least 1'
    }),
    
  usesPerCustomer: Joi.number().integer().min(1)
    .messages({
      'number.base': 'Uses per customer must be a number',
      'number.integer': 'Uses per customer must be an integer',
      'number.min': 'Uses per customer must be at least 1'
    }),
    
  description: Joi.string().max(200)
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot exceed 200 characters'
    }),
    
  isActive: Joi.boolean()
    .messages({
      'boolean.base': 'isActive must be a boolean value'
    }),
    
  applicableProducts: Joi.array().items(Joi.string())
    .messages({
      'array.base': 'Applicable products must be an array',
      'string.base': 'Each product ID must be a string'
    }),
    
  applicableCategories: Joi.array().items(Joi.string())
    .messages({
      'array.base': 'Applicable categories must be an array',
      'string.base': 'Each category ID must be a string'
    }),
    
  excludedProducts: Joi.array().items(Joi.string())
    .messages({
      'array.base': 'Excluded products must be an array',
      'string.base': 'Each product ID must be a string'
    }),
    
  minItems: Joi.number().integer().min(1)
    .messages({
      'number.base': 'Minimum items must be a number',
      'number.integer': 'Minimum items must be an integer',
      'number.min': 'Minimum items must be at least 1'
    }),
    
  firstTimeCustomersOnly: Joi.boolean()
    .messages({
      'boolean.base': 'firstTimeCustomersOnly must be a boolean value'
    })
}).min(1);

// Schema for validating coupon code in route parameters
const couponCodeSchema = Joi.object({
  code: Joi.string().required()
    .messages({
      'string.base': 'Coupon code must be a string',
      'string.empty': 'Coupon code is required',
      'any.required': 'Coupon code is required'
    })
});

// Schema for validating coupon application to a cart
const applyCouponSchema = Joi.object({
  code: Joi.string().required()
    .messages({
      'string.base': 'Coupon code must be a string',
      'string.empty': 'Coupon code is required',
      'any.required': 'Coupon code is required'
    }),
    
  userId: Joi.string().required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.empty': 'User ID is required',
      'any.required': 'User ID is required'
    }),
    
  cartItems: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
      price: Joi.number().precision(2).positive().required()
    })
  ).min(1).required()
    .messages({
      'array.base': 'Cart items must be an array',
      'array.min': 'At least one cart item is required',
      'any.required': 'Cart items are required'
    }),
    
  subtotal: Joi.number().precision(2).positive().required()
    .messages({
      'number.base': 'Subtotal must be a number',
      'number.positive': 'Subtotal must be greater than 0',
      'number.precision': 'Subtotal cannot have more than 2 decimal places',
      'any.required': 'Subtotal is required'
    })
});

module.exports = {
  createCouponSchema,
  updateCouponSchema,
  couponCodeSchema,
  applyCouponSchema
}; 