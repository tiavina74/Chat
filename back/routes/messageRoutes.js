const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const { authenticateToken } = require('../middlewares/authMiddleware'); // Middleware pour vérifier le token JWT
const router = express.Router();

// Envoyer un message
router.post('/send', authenticateToken, sendMessage);

// Récupérer les messages d'un utilisateur
router.get('/', authenticateToken, getMessages);

module.exports = router;
