const express = require('express');
const router = express.Router();
const { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, updateProfileSchema } = require('../../validation/userValidation');
const validateRequest = require('../../middleware/validateRequest');
const auth = require('../../middleware/auth');

// Example user controller (mock)
const userController = {
  register: (req, res) => {
    // This would contain actual registration logic
    res.status(201).json({ 
      status: 'success', 
      message: 'User registered successfully',
      // Notice these fields are pre-validated by the schema
      user: { 
        name: req.body.name,
        email: req.body.email 
      }
    });
  },
  
  login: (req, res) => {
    // This would contain actual login logic
    res.status(200).json({ 
      status: 'success',
      message: 'User logged in successfully',
      token: 'example-jwt-token'
    });
  },
  
  forgotPassword: (req, res) => {
    // This would contain actual forgot password logic
    res.status(200).json({ 
      status: 'success',
      message: 'Password reset instructions sent to email'
    });
  },
  
  resetPassword: (req, res) => {
    // This would contain actual password reset logic
    res.status(200).json({ 
      status: 'success',
      message: 'Password reset successfully'
    });
  },
  
  updateProfile: (req, res) => {
    // This would contain actual profile update logic
    res.status(200).json({ 
      status: 'success',
      message: 'Profile updated successfully',
      // Notice these fields are pre-validated by the schema
      user: {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
      }
    });
  }
};

// Public routes
router.post('/register', validateRequest(registerSchema), userController.register);
router.post('/login', validateRequest(loginSchema), userController.login);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), userController.forgotPassword);
router.post('/reset-password', validateRequest(resetPasswordSchema), userController.resetPassword);

// Protected routes (require authentication)
router.put('/profile', auth, validateRequest(updateProfileSchema), userController.updateProfile);

module.exports = router; 