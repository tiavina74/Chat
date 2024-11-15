const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Message extends Model {
    static associate(models) {
      // Association avec l'utilisateur (expéditeur)
      this.belongsTo(models.User, {
        foreignKey: "senderId",
        as: "sender"
      });

      // Association avec l'utilisateur (destinataire)
      this.belongsTo(models.User, {
        foreignKey: "receiverId",
        as: "receiver"
      });
    }
  }

  Message.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );

  return Message;
};
