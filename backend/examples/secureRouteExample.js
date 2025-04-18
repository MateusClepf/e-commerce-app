const express = require('express');
const router = express.Router();
const {
  auth,
  admin,
  resourceOwnerOrAdmin,
  validateRequest,
  sqlInjectionProtection
} = require('../middleware');

// Import validation schemas
const {
  createProductSchema,
  updateProductSchema,
  productIdSchema
} = require('../validation');

// Example controller (mock)
const productController = {
  // Public route - accessible to everyone
  getAllProducts: (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Products retrieved successfully'
    });
  },
  
  // Authenticated route - only for logged in users
  getProductDetails: (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Product details retrieved successfully',
      product: {
        id: req.params.id,
        name: 'Sample Product',
        ownerId: req.user.id // The authenticated user's ID
      }
    });
  },
  
  // Admin-only route
  createProduct: (req, res) => {
    res.status(201).json({
      status: 'success',
      message: 'Product created successfully'
    });
  },
  
  // Resource owner check - only the owner or admin can update
  updateProduct: (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Product updated successfully'
    });
  },
  
  // Admin-only route with additional SQL injection protection
  searchProducts: (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Products search completed'
    });
  }
};

// Example function to get owner ID of a product
const getProductOwnerId = async (req) => {
  // In a real application, this would query the database
  // For this example, we just return a mock value
  return 'product-owner-id';
};

// Public route - accessible to everyone
router.get(
  '/',
  productController.getAllProducts
);

// Product details - authenticated users only
router.get(
  '/:id',
  validateRequest(productIdSchema, 'params'),
  auth,
  productController.getProductDetails
);

// Create product - admin only with validation and SQL injection protection
router.post(
  '/',
  auth,
  admin,
  validateRequest(createProductSchema),
  sqlInjectionProtection({
    checkBody: true,
    checkQuery: false,
    checkParams: false
  }),
  productController.createProduct
);

// Update product - only owner or admin with validation
router.put(
  '/:id',
  validateRequest(productIdSchema, 'params'),
  validateRequest(updateProductSchema),
  auth,
  resourceOwnerOrAdmin(getProductOwnerId),
  productController.updateProduct
);

// Admin search with extra SQL injection protection
router.get(
  '/admin/search',
  auth,
  admin,
  sqlInjectionProtection({
    checkQuery: true,
    blockLevel: 'all'
  }),
  productController.searchProducts
);

module.exports = router; 