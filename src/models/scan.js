const { DataTypes } = require('sequelize');
const db = require('../databases/index');

const Scan = db.define(
  'Scan',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('info', 'reminder', 'promotion'),
      allowNull: false,
      defaultValue: 'info',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Title',
    },
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: 'notification',
    indexes: [
      {
        unique: true,
        fields: ['id'],
        name: 'idx_notif_id',
      },
      {
        unique: true,
        fields: ['name'],
        name: 'idx_notif_title',
      },
    ],
  },
);

module.exports = Scan;
