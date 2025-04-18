const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const { cacheResponse, clearCache } = require('../middleware/cache.middleware');

// Public endpoints (no auth required)
// Add caching for 1 hour (3600 seconds) to categories list
router.get('/', cacheResponse('categories', 3600), categoryController.findAll);
router.get('/active', cacheResponse('active-categories', 3600), categoryController.findAllActive);
router.get('/:id', cacheResponse('category-detail', 3600), categoryController.findOne);

// Protected endpoints (admin only)
// Add cache clearing after mutations
router.post('/', 
  authMiddleware.verifyToken, 
  adminMiddleware.isAdmin, 
  clearCache(['categories*', 'active-categories*']), 
  categoryController.create
);

router.put('/:id', 
  authMiddleware.verifyToken, 
  adminMiddleware.isAdmin, 
  clearCache(['categories*', 'active-categories*', 'category-detail*']), 
  categoryController.update
);

router.delete('/:id', 
  authMiddleware.verifyToken, 
  adminMiddleware.isAdmin, 
  clearCache(['categories*', 'active-categories*', 'category-detail*']), 
  categoryController.delete
);

module.exports = router; 