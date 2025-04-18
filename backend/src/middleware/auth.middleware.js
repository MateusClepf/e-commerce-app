const jwt = require('jsonwebtoken');

// JWT secret key (should be in env variables in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware; 