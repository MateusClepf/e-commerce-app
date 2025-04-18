const Joi = require('joi');

// Schema for validating user registration
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required'
    }),

  email: Joi.string().email().required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Please enter a valid email',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),

  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required'
    }),

  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'string.base': 'Confirm password must be a string',
      'any.only': 'Passwords do not match',
      'string.empty': 'Confirm password is required',
      'any.required': 'Confirm password is required'
    })
});

// Schema for validating user login
const loginSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Please enter a valid email',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),

  password: Joi.string().required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
      'any.required': 'Password is required'
    })
});

// Schema for validating forgot password
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Please enter a valid email',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    })
});

// Schema for validating reset password
const resetPasswordSchema = Joi.object({
  token: Joi.string().required()
    .messages({
      'string.base': 'Token must be a string',
      'string.empty': 'Token is required',
      'any.required': 'Token is required'
    }),

  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required'
    }),

  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'string.base': 'Confirm password must be a string',
      'any.only': 'Passwords do not match',
      'string.empty': 'Confirm password is required',
      'any.required': 'Confirm password is required'
    })
});

// Schema for validating profile update
const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50)
    .messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters'
    }),

  email: Joi.string().email()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Please enter a valid email'
    }),

  currentPassword: Joi.string().when('newPassword', {
    is: Joi.exist(),
    then: Joi.required(),
    otherwise: Joi.optional()
  }).messages({
    'string.base': 'Current password must be a string',
    'string.empty': 'Current password is required when changing password',
    'any.required': 'Current password is required when changing password'
  }),

  newPassword: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .optional()
    .messages({
      'string.base': 'New password must be a string',
      'string.min': 'New password must be at least 8 characters',
      'string.pattern.base': 'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }),

  address: Joi.object({
    street: Joi.string().max(100),
    city: Joi.string().max(50),
    state: Joi.string().max(50),
    zipCode: Joi.string().max(20),
    country: Joi.string().max(50)
  }).optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema
}; 