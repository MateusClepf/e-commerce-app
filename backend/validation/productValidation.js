const Joi = require('joi');

// Schema for creating a new product
const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required()
    .messages({
      'string.base': 'Product name must be a string',
      'string.empty': 'Product name is required',
      'string.min': 'Product name must be at least 3 characters',
      'string.max': 'Product name cannot exceed 100 characters',
      'any.required': 'Product name is required'
    }),
    
  description: Joi.string().min(10).max(2000).required()
    .messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 10 characters',
      'string.max': 'Description cannot exceed 2000 characters',
      'any.required': 'Description is required'
    }),
    
  price: Joi.number().precision(2).positive().required()
    .messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be greater than 0',
      'number.precision': 'Price cannot have more than 2 decimal places',
      'any.required': 'Price is required'
    }),
    
  salePrice: Joi.number().precision(2).positive().allow(null).optional()
    .messages({
      'number.base': 'Sale price must be a number',
      'number.positive': 'Sale price must be greater than 0',
      'number.precision': 'Sale price cannot have more than 2 decimal places'
    }),
    
  categoryId: Joi.string().required()
    .messages({
      'string.base': 'Category ID must be a string',
      'string.empty': 'Category ID is required',
      'any.required': 'Category ID is required'
    }),
    
  images: Joi.array().items(Joi.string().uri()).min(1).required()
    .messages({
      'array.base': 'Images must be an array',
      'array.min': 'At least one image is required',
      'any.required': 'At least one image is required',
      'string.uri': 'Image URL must be a valid URL'
    }),
    
  stock: Joi.number().integer().min(0).required()
    .messages({
      'number.base': 'Stock must be a number',
      'number.integer': 'Stock must be an integer',
      'number.min': 'Stock cannot be negative',
      'any.required': 'Stock is required'
    }),
    
  sku: Joi.string().pattern(/^[A-Za-z0-9-_]{5,20}$/).required()
    .messages({
      'string.base': 'SKU must be a string',
      'string.pattern.base': 'SKU must contain 5-20 alphanumeric characters, hyphens, or underscores',
      'string.empty': 'SKU is required',
      'any.required': 'SKU is required'
    }),
    
  isActive: Joi.boolean().default(true)
    .messages({
      'boolean.base': 'isActive must be a boolean value'
    }),
    
  attributes: Joi.object().pattern(
    Joi.string(),
    Joi.alternatives().try(Joi.string(), Joi.number(), Joi.boolean())
  ).optional()
    .messages({
      'object.base': 'Attributes must be an object'
    }),
    
  tags: Joi.array().items(Joi.string()).optional()
    .messages({
      'array.base': 'Tags must be an array',
      'string.base': 'Each tag must be a string'
    }),
    
  variants: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      options: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          priceModifier: Joi.number().precision(2).optional(),
          stockCount: Joi.number().integer().min(0).optional()
        })
      ).min(1).required()
    })
  ).optional()
    .messages({
      'array.base': 'Variants must be an array'
    })
});

// Schema for updating an existing product
const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100)
    .messages({
      'string.base': 'Product name must be a string',
      'string.min': 'Product name must be at least 3 characters',
      'string.max': 'Product name cannot exceed 100 characters'
    }),
    
  description: Joi.string().min(10).max(2000)
    .messages({
      'string.base': 'Description must be a string',
      'string.min': 'Description must be at least 10 characters',
      'string.max': 'Description cannot exceed 2000 characters'
    }),
    
  price: Joi.number().precision(2).positive()
    .messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be greater than 0',
      'number.precision': 'Price cannot have more than 2 decimal places'
    }),
    
  salePrice: Joi.number().precision(2).positive().allow(null)
    .messages({
      'number.base': 'Sale price must be a number',
      'number.positive': 'Sale price must be greater than 0',
      'number.precision': 'Sale price cannot have more than 2 decimal places'
    }),
    
  categoryId: Joi.string()
    .messages({
      'string.base': 'Category ID must be a string'
    }),
    
  images: Joi.array().items(Joi.string().uri()).min(1)
    .messages({
      'array.base': 'Images must be an array',
      'array.min': 'At least one image is required',
      'string.uri': 'Image URL must be a valid URL'
    }),
    
  stock: Joi.number().integer().min(0)
    .messages({
      'number.base': 'Stock must be a number',
      'number.integer': 'Stock must be an integer',
      'number.min': 'Stock cannot be negative'
    }),
    
  sku: Joi.string().pattern(/^[A-Za-z0-9-_]{5,20}$/)
    .messages({
      'string.base': 'SKU must be a string',
      'string.pattern.base': 'SKU must contain 5-20 alphanumeric characters, hyphens, or underscores'
    }),
    
  isActive: Joi.boolean()
    .messages({
      'boolean.base': 'isActive must be a boolean value'
    }),
    
  attributes: Joi.object().pattern(
    Joi.string(),
    Joi.alternatives().try(Joi.string(), Joi.number(), Joi.boolean())
  )
    .messages({
      'object.base': 'Attributes must be an object'
    }),
    
  tags: Joi.array().items(Joi.string())
    .messages({
      'array.base': 'Tags must be an array',
      'string.base': 'Each tag must be a string'
    }),
    
  variants: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      options: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          priceModifier: Joi.number().precision(2).optional(),
          stockCount: Joi.number().integer().min(0).optional()
        })
      ).min(1).required()
    })
  )
    .messages({
      'array.base': 'Variants must be an array'
    })
}).min(1);

// Schema for validating product ID in route parameters
const productIdSchema = Joi.object({
  id: Joi.string().required()
    .messages({
      'string.base': 'Product ID must be a string',
      'string.empty': 'Product ID is required',
      'any.required': 'Product ID is required'
    })
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  productIdSchema
}; 