const express = require('express');
const router = express.Router();
const couponController = require('../controllers/coupon.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Public endpoints (no auth required)
router.get('/validate/:code', couponController.validateCoupon);

// Admin-only endpoints
router.get('/', [authMiddleware, adminMiddleware], couponController.findAll);
router.get('/:id', [authMiddleware, adminMiddleware], couponController.findOne);
router.post('/', [authMiddleware, adminMiddleware], couponController.create);
router.put('/:id', [authMiddleware, adminMiddleware], couponController.update);
router.delete('/:id', [authMiddleware, adminMiddleware], couponController.delete);

module.exports = router; 