const DataType = require('sequelize');
const db = require('../../databases/index');

const User = db.define(
  'User',
  {
    user_id: {
      type: DataType.UUID,
      // defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    token: {
      type: DataType.STRING(),
      allowNull: false,
      unique: true,
    },
    expire: {
      type: DataType.DATE(),
    }
  },
  {
    tableName: 'logged_out_tokens',
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['user_id'],
        name: 'idx_logged_out_uid',
      },
    ],
  },
);

module.exports = User;