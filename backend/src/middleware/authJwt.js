const jwt = require('jsonwebtoken');
const db = require('../models');

// JWT secret key (should be in env variables in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.role === 'admin') {
      next();
      return;
    }
    
    res.status(403).json({ message: 'Require Admin Role!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  verifyToken,
  isAdmin
};