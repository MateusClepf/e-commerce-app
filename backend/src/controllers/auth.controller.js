const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// JWT secret key (should be in env variables in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register a new user
exports.register = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: req.body.email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Create the user
    const user = await User.create({
      ...req.body,
      password: hashedPassword
    });
    
    // Create JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: '24h'
    });
    
    // Return user (excluding password) and token
    const { password, ...userWithoutPassword } = user.toJSON();
    
    return res.status(201).json({
      ...userWithoutPassword,
      token
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Create JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: '24h'
    });
    
    // Return user (excluding password) and token
    const { password, ...userWithoutPassword } = user.toJSON();
    
    return res.status(200).json({
      ...userWithoutPassword,
      token
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Forgot password - request reset
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Find user by email
    const user = await User.findOne({ where: { email } });
    
    // Don't reveal if user exists or not (security best practice)
    if (!user) {
      return res.status(200).json({ message: 'If the email exists, a reset link has been sent' });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour
    
    // Save token to user
    await User.update(
      { 
        resetToken,
        resetTokenExpiry
      },
      { where: { id: user.id } }
    );
    
    // In a real application, send email with reset link
    // For this example, we'll just return the token in the response
    // In production, you would use a service like SendGrid, Mailgun, etc.
    
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    // Log the reset URL (for demo purposes only)
    console.log(`Password reset link: ${resetUrl}`);
    
    return res.status(200).json({ 
      message: 'If the email exists, a reset link has been sent',
      // Only include token in development for testing
      ...(process.env.NODE_ENV !== 'production' && { resetUrl })
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Reset password with token
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and password are required' });
    }
    
    // Find user with valid reset token
    const user = await User.findOne({ 
      where: { 
        resetToken: token,
        resetTokenExpiry: { [db.Sequelize.Op.gt]: Date.now() } // Token not expired
      } 
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Update user password and clear reset token
    await User.update(
      { 
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      },
      { where: { id: user.id } }
    );
    
    return res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return user without password
    const { password, ...userWithoutPassword } = user.toJSON();
    
    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Social login
exports.socialLogin = async (req, res) => {
  try {
    const { provider, accessToken } = req.body;

    if (!provider || !accessToken) {
      return res.status(400).json({ message: 'Provider and access token are required' });
    }

    // In a real implementation, you would validate the token with the provider
    // For example, for Google, you would call their API to verify the token
    // For this example, we'll just create/login a user based on the email from the request

    // This would come from verifying the token with the social provider
    const socialEmail = req.body.email || 'test@example.com';
    const firstName = req.body.firstName || 'Social';
    const lastName = req.body.lastName || 'User';

    // Check if user exists
    let user = await User.findOne({ where: { email: socialEmail } });

    if (!user) {
      // Create a new user
      user = await User.create({
        email: socialEmail,
        firstName,
        lastName,
        password: crypto.randomBytes(20).toString('hex'), // Random password since they'll use social login
        provider
      });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: '24h'
    });

    // Return user (excluding password) and token
    const { password, ...userWithoutPassword } = user.toJSON();

    return res.status(200).json({
      ...userWithoutPassword,
      token
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};