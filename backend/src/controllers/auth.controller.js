const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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