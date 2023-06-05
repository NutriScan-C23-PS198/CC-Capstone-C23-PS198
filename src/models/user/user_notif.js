const Sequelize = require('sequelize');
const db = require('../../databases/index');

const UserNoif = db.define(
  'UserNotif',
  {
    notification_id: {
      type: Sequelize.UUID,
      // defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.UUID,
      // defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    read: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    tableName: 'user_notification',
  },
);

module.exports = UserNoif;