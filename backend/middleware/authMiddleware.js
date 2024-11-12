const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}

module.exports = {
  verifyToken,
  authorizeRoles,
};
