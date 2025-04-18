const Joi = require('joi');

// Schema for creating a new category
const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
    .messages({
      'string.base': 'Category name must be a string',
      'string.empty': 'Category name is required',
      'string.min': 'Category name must be at least 2 characters',
      'string.max': 'Category name cannot exceed 50 characters',
      'any.required': 'Category name is required'
    }),
    
  description: Joi.string().max(500).allow('').optional()
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot exceed 500 characters'
    }),
    
  imageUrl: Joi.string().uri().allow('').optional()
    .messages({
      'string.base': 'Image URL must be a string',
      'string.uri': 'Please enter a valid URL for the image'
    }),
    
  parentCategory: Joi.string().allow(null, '').optional()
    .messages({
      'string.base': 'Parent category must be a string'
    }),
    
  isActive: Joi.boolean().default(true)
    .messages({
      'boolean.base': 'isActive must be a boolean value'
    }),
    
  order: Joi.number().integer().min(0).default(0)
    .messages({
      'number.base': 'Order must be a number',
      'number.integer': 'Order must be an integer',
      'number.min': 'Order must be a positive number or zero'
    })
});

// Schema for updating an existing category
const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50)
    .messages({
      'string.base': 'Category name must be a string',
      'string.min': 'Category name must be at least 2 characters',
      'string.max': 'Category name cannot exceed 50 characters'
    }),
    
  description: Joi.string().max(500).allow('').optional()
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot exceed 500 characters'
    }),
    
  imageUrl: Joi.string().uri().allow('').optional()
    .messages({
      'string.base': 'Image URL must be a string',
      'string.uri': 'Please enter a valid URL for the image'
    }),
    
  parentCategory: Joi.string().allow(null, '').optional()
    .messages({
      'string.base': 'Parent category must be a string'
    }),
    
  isActive: Joi.boolean()
    .messages({
      'boolean.base': 'isActive must be a boolean value'
    }),
    
  order: Joi.number().integer().min(0)
    .messages({
      'number.base': 'Order must be a number',
      'number.integer': 'Order must be an integer',
      'number.min': 'Order must be a positive number or zero'
    })
});

// Schema for validating category ID in route parameters
const categoryIdSchema = Joi.object({
  id: Joi.string().required()
    .messages({
      'string.base': 'Category ID must be a string',
      'string.empty': 'Category ID is required',
      'any.required': 'Category ID is required'
    })
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema
}; 