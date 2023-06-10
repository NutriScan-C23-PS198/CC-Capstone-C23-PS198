const { DataTypes } = require('sequelize');
const db = require('../../databases/index');
const uuid = require('node-uuid');

const User = db.define(
  'User',
  {
    id: {
      type: DataTypes.STRING.BINARY,
      primaryKey: true,
      unique: true,
      allowNull: false,
      // defaultValue: Sequelize.UUIDV4,
      defaultValue: db.fn('UUID_TO_BIN', uuid.v4(), 1),
      get: function() {
        if (this.getDataValue('id'))
          return uuid.unparse(this.getDataValue('id'));
      },
      set: function(value) {
        if (value) {
          // swap the string UUID
          var swapped = db.fn('UUID_TO_BIN', value, 1);
          this.setDataValue('id', swapped);
        }
      }
    },
    username: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    created_at: DataTypes.DATE(),
    // The JWT token
    token: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
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
