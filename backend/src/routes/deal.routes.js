const express = require('express');
const router = express.Router();
const dealController = require('../controllers/deal.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Public endpoints (no auth required)
router.get('/', dealController.findAll);
router.get('/active', dealController.findAllActive);
router.get('/:id', dealController.findOne);

// Admin-only endpoints
router.post('/', [authMiddleware, adminMiddleware], dealController.create);
router.put('/:id', [authMiddleware, adminMiddleware], dealController.update);
router.delete('/:id', [authMiddleware, adminMiddleware], dealController.delete);

module.exports = router; 