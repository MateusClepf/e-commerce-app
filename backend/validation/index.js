const userValidation = require('./userValidation');
const categoryValidation = require('./categoryValidation');
const productValidation = require('./productValidation');
const orderValidation = require('./orderValidation');
const reviewValidation = require('./reviewValidation');
const couponValidation = require('./couponValidation');

module.exports = {
  // User validation schemas
  ...userValidation,
  
  // Category validation schemas
  ...categoryValidation,
  
  // Product validation schemas
  ...productValidation,
  
  // Order validation schemas
  ...orderValidation,
  
  // Review validation schemas
  ...reviewValidation,
  
  // Coupon validation schemas
  ...couponValidation
}; 