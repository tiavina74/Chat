import io from 'socket.io-client';

// Connexion au serveur WebSocket
const socket = io('http://localhost:5000');

// Fonction pour envoyer un message
export const sendMessage = (message) => {
  socket.emit('sendMessage', message); // Envoie du message au serveur
};

// Fonction pour écouter les messages entrants
export const listenForMessages = (callback) => {
  socket.on('receiveMessage', (message) => {
    callback(message);  // Exécute la fonction de rappel avec le message reçu
  });
};

export default socket;
