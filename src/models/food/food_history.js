const { DataTypes } = require('sequelize');
const db = require('../../databases/index');

const FoodHistory = db.define(
  'FoodHistory',
  {
    history_id: {
      type: DataTypes.STRING.BINARY,
      primaryKey: true,
      foreignKey: true,
      references: {
        model: 'UserHistory',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      get: function() {
        if (this.getDataValue('history_id'))
          return uuid.unparse(this.getDataValue('history_id'));
      },
    },
    food_id: {
      type: DataTypes.STRING.BINARY,
      primaryKey: true,
      foreignKey: true,
      references: {
        model: 'Food',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      get: function() {
        if (this.getDataValue('food_id'))
          return uuid.unparse(this.getDataValue('food_id'));
      },
    },
  },
  {
    timestamps: false,
    tableName: 'user_history_food',
  },
);

module.exports = FoodHistory;
