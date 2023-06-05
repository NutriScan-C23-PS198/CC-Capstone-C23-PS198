const { DataTypes } = require('sequelize');
const db = require('../../databases/index');

const FoodBrand = db.define(
  'FoodBrand',
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
      allowNull: false,
    },
  },
  {
    tableName: 'brand',
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['id'],
        name: 'idx_brand_id',
      },
      {
        unique: true,
        fields: ['name'],
        name: 'idx_brand_name',
      },
    ],
  },
);

module.exports = FoodBrand;
