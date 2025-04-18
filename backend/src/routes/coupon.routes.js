const express = require('express');
const router = express.Router();
const couponController = require('../controllers/coupon.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const { cacheResponse, clearCache } = require('../middleware/cache.middleware');

// Public endpoint for coupon validation - cache for 5 minutes (300 seconds)
router.get('/validate/:code', cacheResponse('coupon-validate', 300), couponController.validateCoupon);

// Admin-only endpoints
// List coupons (admin only) - cache for 1 hour
router.get('/', 
  authMiddleware.verifyToken,
  adminMiddleware.isAdmin,
  cacheResponse('admin-coupons', 3600), 
  couponController.findAll
);

// Add cache clearing after mutations
router.post('/', 
  authMiddleware.verifyToken,
  adminMiddleware.isAdmin,
  clearCache(['admin-coupons*', 'coupon-validate*']),
  couponController.create
);

router.put('/:id', 
  authMiddleware.verifyToken,
  adminMiddleware.isAdmin,
  clearCache(['admin-coupons*', 'coupon-validate*']),
  couponController.update
);

router.delete('/:id', 
  authMiddleware.verifyToken,
  adminMiddleware.isAdmin,
  clearCache(['admin-coupons*', 'coupon-validate*']),
  couponController.delete
);

module.exports = router; 