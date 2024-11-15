const { Message } = require('../models');
const jwt = require('jsonwebtoken');

exports.sendMessage = async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur authentifié à partir du token JWT
    const { senderId } = req.user; // Assurez-vous que vous avez ce champ dans le token

    // Récupérer le contenu du message et l'ID du destinataire depuis la requête
    const { content, receiverId } = req.body;

    // Vérifier si l'utilisateur est bien authentifié (senderId doit être valide)
    if (!senderId) {
      return res.status(400).json({ error: 'Sender ID is required' });
    }

    // Créer un message
    const message = await Message.create({
      content,
      senderId,  // Ajouter l'ID de l'utilisateur connecté
      receiverId,
    });

    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
// Récupérer les messages d'un utilisateur (envoyés et reçus)
exports.getMessages = async (req, res) => {
  const userId = req.user.id; // L'utilisateur connecté

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      include: [
        { model: User, as: 'sender', attributes: ['username'] },
        { model: User, as: 'receiver', attributes: ['username'] }
      ],
      order: [['createdAt', 'ASC']],
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
