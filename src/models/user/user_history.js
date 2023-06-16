const { DataTypes } = require('sequelize');
const db = require('../../databases/index');
const uuid = require('node-uuid');

const UserHistory = db.define(
  'UserHistory',
  {
    id: {
      type: DataTypes.STRING.BINARY,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: db.fn('UUID_TO_BIN', uuid.v4(), 1),
      get: function() {
        if (this.getDataValue('id'))
          return uuid.unparse(this.getDataValue('id'));
      },
      // set: function(value) {
      //   if (value) {
      //     // swap the string UUID
      //     var swapped = db.fn('UUID_TO_BIN', value, 1);
      //     this.setDataValue('id', swapped);
      //   }
      // }
    },
    user_id: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      get: function() {
        if (this.getDataValue('user_id'))
          return uuid.unparse(this.getDataValue('user_id'));
      },
      // set: function(value) {
      //   if (value) {
      //     // swap the string UUID
      //     var swapped = db.fn('UUID_TO_BIN', value, 1);
      //     this.setDataValue('user_id', swapped);
      //   }
      // }
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
    },
    food_id: {
      type: DataTypes.STRING.BINARY,
      primaryKey: true,
      foreignKey: true,
      allowNull: false,
      references: {
        model: 'Food',
        key: 'id'
      },
      get: function() {
        if (this.getDataValue('food_id'))
          return uuid.unparse(this.getDataValue('food_id'));
      },
      // set: function(value) {
      //   if (value) {
      //     // swap the string UUID
      //     var swapped = db.fn('UUID_TO_BIN', value, 1);
      //     this.setDataValue('food_id', swapped);
      //   }
      // }
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
    // hooks: {
    //   afterCreate: (instance, options) => {
    //     instance.id      = uuid.unparse(instance.id);
    //     instance.user_id = uuid.unparse(instance.user_id);
    //     instance.food_id = uuid.unparse(instance.food_id);
    //   }
    // },
  },
);

module.exports = UserHistory;
