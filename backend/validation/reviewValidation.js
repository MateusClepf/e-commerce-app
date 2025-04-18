const Joi = require('joi');

// Schema for creating a new review
const createReviewSchema = Joi.object({
  productId: Joi.string().required()
    .messages({
      'string.base': 'Product ID must be a string',
      'string.empty': 'Product ID is required',
      'any.required': 'Product ID is required'
    }),
    
  userId: Joi.string().required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.empty': 'User ID is required',
      'any.required': 'User ID is required'
    }),
    
  rating: Joi.number().integer().min(1).max(5).required()
    .messages({
      'number.base': 'Rating must be a number',
      'number.integer': 'Rating must be an integer',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating cannot exceed 5',
      'any.required': 'Rating is required'
    }),
    
  title: Joi.string().min(3).max(100).required()
    .messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters',
      'string.max': 'Title cannot exceed 100 characters',
      'any.required': 'Title is required'
    }),
    
  comment: Joi.string().min(10).max(1000).required()
    .messages({
      'string.base': 'Comment must be a string',
      'string.empty': 'Comment is required',
      'string.min': 'Comment must be at least 10 characters',
      'string.max': 'Comment cannot exceed 1000 characters',
      'any.required': 'Comment is required'
    }),
    
  isVerifiedPurchase: Joi.boolean().default(false)
    .messages({
      'boolean.base': 'isVerifiedPurchase must be a boolean value'
    }),
    
  images: Joi.array().items(Joi.string().uri()).max(5).optional()
    .messages({
      'array.base': 'Images must be an array',
      'array.max': 'Cannot upload more than 5 images',
      'string.uri': 'Image URL must be a valid URL'
    }),
    
  pros: Joi.array().items(Joi.string().max(100)).max(5).optional()
    .messages({
      'array.base': 'Pros must be an array',
      'array.max': 'Cannot add more than 5 pros',
      'string.max': 'Each pro cannot exceed 100 characters'
    }),
    
  cons: Joi.array().items(Joi.string().max(100)).max(5).optional()
    .messages({
      'array.base': 'Cons must be an array',
      'array.max': 'Cannot add more than 5 cons',
      'string.max': 'Each con cannot exceed 100 characters'
    })
});

// Schema for updating an existing review
const updateReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5)
    .messages({
      'number.base': 'Rating must be a number',
      'number.integer': 'Rating must be an integer',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating cannot exceed 5'
    }),
    
  title: Joi.string().min(3).max(100)
    .messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must be at least 3 characters',
      'string.max': 'Title cannot exceed 100 characters'
    }),
    
  comment: Joi.string().min(10).max(1000)
    .messages({
      'string.base': 'Comment must be a string',
      'string.min': 'Comment must be at least 10 characters',
      'string.max': 'Comment cannot exceed 1000 characters'
    }),
    
  images: Joi.array().items(Joi.string().uri()).max(5)
    .messages({
      'array.base': 'Images must be an array',
      'array.max': 'Cannot upload more than 5 images',
      'string.uri': 'Image URL must be a valid URL'
    }),
    
  pros: Joi.array().items(Joi.string().max(100)).max(5)
    .messages({
      'array.base': 'Pros must be an array',
      'array.max': 'Cannot add more than 5 pros',
      'string.max': 'Each pro cannot exceed 100 characters'
    }),
    
  cons: Joi.array().items(Joi.string().max(100)).max(5)
    .messages({
      'array.base': 'Cons must be an array',
      'array.max': 'Cannot add more than 5 cons',
      'string.max': 'Each con cannot exceed 100 characters'
    })
}).min(1);

// Schema for admin review moderation
const moderateReviewSchema = Joi.object({
  isApproved: Joi.boolean().required()
    .messages({
      'boolean.base': 'isApproved must be a boolean value',
      'any.required': 'isApproved is required'
    }),
    
  moderationNotes: Joi.string().max(500).allow('').optional()
    .messages({
      'string.base': 'Moderation notes must be a string',
      'string.max': 'Moderation notes cannot exceed 500 characters'
    }),
    
  isFeatured: Joi.boolean().optional()
    .messages({
      'boolean.base': 'isFeatured must be a boolean value'
    })
});

// Schema for validating review ID in route parameters
const reviewIdSchema = Joi.object({
  id: Joi.string().required()
    .messages({
      'string.base': 'Review ID must be a string',
      'string.empty': 'Review ID is required',
      'any.required': 'Review ID is required'
    })
});

// Schema for validating product ID in route parameters
const productReviewsSchema = Joi.object({
  productId: Joi.string().required()
    .messages({
      'string.base': 'Product ID must be a string',
      'string.empty': 'Product ID is required',
      'any.required': 'Product ID is required'
    })
});

module.exports = {
  createReviewSchema,
  updateReviewSchema,
  moderateReviewSchema,
  reviewIdSchema,
  productReviewsSchema
}; 