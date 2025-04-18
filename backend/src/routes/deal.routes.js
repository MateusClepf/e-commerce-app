const express = require('express');
const router = express.Router();
const dealController = require('../controllers/deal.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const { cacheResponse, clearCache } = require('../middleware/cache.middleware');

// Public endpoints (no auth required)
// Add caching for 1 hour (3600 seconds) to deals list
router.get('/', cacheResponse('deals', 3600), dealController.findAll);
router.get('/active', cacheResponse('active-deals', 3600), dealController.findAllActive);
router.get('/:id', cacheResponse('deal-detail', 3600), dealController.findOne);

// Protected endpoints (admin only)
// Add cache clearing after mutations
router.post('/', 
  authMiddleware.verifyToken,
  adminMiddleware.isAdmin,
  clearCache(['deals*', 'active-deals*']),
  dealController.create
);

router.put('/:id', 
  authMiddleware.verifyToken,
  adminMiddleware.isAdmin,
  clearCache(['deals*', 'active-deals*', 'deal-detail*']),
  dealController.update
);

router.delete('/:id', 
  authMiddleware.verifyToken,
  adminMiddleware.isAdmin,
  clearCache(['deals*', 'active-deals*', 'deal-detail*']),
  dealController.delete
);

module.exports = router; 