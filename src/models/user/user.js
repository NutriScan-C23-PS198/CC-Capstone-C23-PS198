const Sequelize = require('sequelize');
const db = require('../../databases/index');

const User = db.define(
  'User',
  {
    id: {
      type: Sequelize.UUID,
      // defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(),
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING(),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(),
      allowNull: false,
    },
    photo: {
      type: Sequelize.STRING(),
      allowNull: true,
    },
    created_at: Sequelize.DATE(),
  },
  {
    timestamps: false,
    tableName: 'user_account',
    indexes: [
      {
        unique: true,
        fields: ['id'],
        name: 'idx_account_id',
      },
      {
        unique: true,
        fields: ['username'],
        name: 'idx_account_uname',
      },
      {
        unique: true,
        fields: ['email'],
        name: 'idx_account_email',
      },
    ],
  },
);

module.exports = User;
