const { DataTypes } = require('sequelize');
const db = require('../databases/index');

const Notifs = db.define(
  'Notifs',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: db.fn('uuid_to_bin', db.fn('uuid'), 1),
      get: function() {
        if (this.getDataValue('id'))
          return db.fn('bin_to_uuid', this.getDataValue('id'), 1)
      },
      set: function(value) {
        if (value)
          this.setDataValue('id', db.fn('uuid_to_bin', value, 1))
      }
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

module.exports = Notifs;
