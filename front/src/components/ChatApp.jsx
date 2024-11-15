import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Connecter le socket au serveur
const socket = io('http://localhost:5000');

const ChatApp = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Fonction pour gérer l'envoi de message
  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', message);  // Envoi du message au serveur
      setMessage(''); // Réinitialisation de l'input
    }
  };

  // Fonction pour recevoir les messages
  useEffect(() => {
    socket.on('receiveMessage', (receivedMessage) => {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    return () => {
      socket.off('receiveMessage'); // Nettoyer l'écouteur lors du démontage du composant
    };
  }, []);

  return (
    <div>
      <div>
        <h2>Chat Messages</h2>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default ChatApp;
