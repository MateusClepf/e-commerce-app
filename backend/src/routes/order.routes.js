const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authJwt } = require('../middleware');

// Create a new order
router.post('/', orderController.create);

// Get all orders for authenticated user
router.get('/', [authJwt.verifyToken], orderController.findAll);

// Get order by id for authenticated user
router.get('/:id', [authJwt.verifyToken], orderController.findOne);

// Get order by id for guest (using email)
router.get('/guest/:id/:email', orderController.findOneGuest);

module.exports = router;