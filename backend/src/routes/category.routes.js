const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

// Public endpoints (no auth required)
router.get('/', categoryController.findAll);
router.get('/active', categoryController.findAllActive);
router.get('/:id', categoryController.findOne);

// Admin-only endpoints
router.post('/', [authMiddleware, adminMiddleware], categoryController.create);
router.put('/:id', [authMiddleware, adminMiddleware], categoryController.update);
router.delete('/:id', [authMiddleware, adminMiddleware], categoryController.delete);

module.exports = router; 