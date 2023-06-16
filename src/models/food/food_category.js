const { DataTypes } = require('sequelize');
const db = require('../../databases/index');

const FoodCategory = db.define(
  'FoodCategory',
  {
    id: {
      type: DataTypes.INTEGER(),
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
      defaultValue: 1,
      get: function() {
        return this.getDataValue('id');
      },
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: 'food_category',
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
