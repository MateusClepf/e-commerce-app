const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authJwt } = require('../middleware');

// Register a new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Social login
router.post('/social-login', authController.socialLogin);

// Forgot password - send reset email
router.post('/forgot-password', authController.forgotPassword);

// Reset password with token
router.post('/reset-password', authController.resetPassword);

// Get current user profile
router.get('/profile', [authJwt.verifyToken], authController.getProfile);

module.exports = router;