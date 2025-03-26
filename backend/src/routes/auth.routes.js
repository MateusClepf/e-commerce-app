const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authJwt } = require('../middleware');

// Register a new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Get current user profile
router.get('/profile', [authJwt.verifyToken], authController.getProfile);

module.exports = router;