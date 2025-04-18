const db = require('../models');

// Check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.role === 'admin') {
      return next();
    }
    
    return res.status(403).json({ message: 'Admin access required' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { isAdmin }; 