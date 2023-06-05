const { DataTypes } = require('sequelize');
const db = require('../../databases/index');

const FoodHistory = db.define(
  'FoodHistory',
  {
    history_id: {
      type: DataTypes.UUID,
    },
    food_id: {
      type: DataTypes.UUID,
    },
  },
  {
    tableName: 'user_history_food',
  },
);

module.exports = FoodHistory;
