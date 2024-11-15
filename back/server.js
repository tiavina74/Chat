const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Pour résoudre le problème CORS
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); // Assurez-vous que Sequelize est correctement configuré
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

const app = express();

// Configurer CORS pour permettre l'accès depuis localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Frontend qui fait les requêtes
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Créer un serveur HTTP pour gérer WebSocket
const server = http.createServer(app);

// Configurer Socket.IO
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Autoriser la connexion WebSocket depuis ce frontend
    methods: ['GET', 'POST'],
  }
});

// Middleware pour gérer les données JSON
app.use(bodyParser.json());

// Routes API pour l'authentification et les messages
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Connexion WebSocket
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Recevoir un message et l'envoyer à tous les clients connectés
  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);
    io.emit('receiveMessage', message);  // Envoi à tous les clients connectés
  });
  
  // Gérer la déconnexion
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Connexion à la base de données et démarrage du serveur
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
