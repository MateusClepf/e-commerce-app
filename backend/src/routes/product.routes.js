const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authJwt } = require('../middleware');

// Get all products
router.get('/', productController.findAll);

// Get product by id
router.get('/:id', productController.findOne);

// Create a new product (admin only)
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productController.create);

// Update a product (admin only)
router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], productController.update);

// Delete a product (admin only)
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], productController.delete);

module.exports = router;