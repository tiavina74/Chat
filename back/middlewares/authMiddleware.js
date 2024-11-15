const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajout de l'utilisateur au request
    next(); // Continuer vers la route
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticateToken };
