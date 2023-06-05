const { DataTypes } = require('sequelize');
const db = require('../../databases/index');

const FoodCategory = db.define(
  'FoodCategory',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    tableName: 'food_category',
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['id'],
        name: 'idx_food_category_id',
      },
      {
        unique: true,
        fields: ['name'],
        name: 'idx_food_category_name',
      },
    ],
  },
);

module.exports = FoodCategory;
