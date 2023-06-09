const DataType = require('sequelize');
const db = require('../../databases/index');

const UserHistory = db.define(
  'UserHistory',
  {
    id: {
      type: DataType.UUID,
      // defaultValue: DataType.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    user_id: {
      type: DataType.UUID,
      allowNull: false,
    },
    photo: {
      type: DataType.STRING,
      allowNull: false,
    },
    time: {
      type: DataType.DATE,
    },
    food: {
      type: DataType.UUID,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'user_history',
    indexes: [
      {
        unique: true,
        fields: ['id'],
        name: 'idx_user_history_id',
      },
      {
        unique: true,
        fields: ['time'],
        name: 'idx_user_history_time',
      },
    ],
  },
);

module.exports = UserHistory;
