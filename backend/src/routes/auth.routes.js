const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authJwt } = require('../middleware');
const validateRequest = require('../../middleware/validateRequest');
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema
} = require('../../validation/userValidation');

// Register a new user
router.post('/register', validateRequest(registerSchema), authController.register);

// Login user
router.post('/login', validateRequest(loginSchema), authController.login);

// Social login
router.post('/social-login', authController.socialLogin);

// Forgot password - send reset email
router.post('/forgot-password', validateRequest(forgotPasswordSchema), authController.forgotPassword);

// Reset password with token
router.post('/reset-password', validateRequest(resetPasswordSchema), authController.resetPassword);

// Get current user profile
router.get('/profile', [authJwt.verifyToken], authController.getProfile);

// Update user profile
router.put('/profile', [
  authJwt.verifyToken,
  validateRequest(updateProfileSchema)
], authController.updateProfile);

module.exports = router;