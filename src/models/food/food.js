const { DataTypes } = require('sequelize');
const db = require('../../databases/index');

// const Food = db.define(
//   'Food',
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       unique: true,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     category_id: {
//       type: DataTypes.UUID,
//     },
//     brand_id: {
//       type: DataTypes.UUID,
//     },
//     photo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     portion: {
//       type: DataTypes.INTEGER,
//     },
//     unit: {
//       type: DataTypes.ENUM('g', 'ml', 'piece', 'portion', 'skewer', 'glass', 'cup', 'can'),
//       defaultValue: 'portion',
//     },
//     callories: {
//       type: DataTypes.INTEGER,
//     },
//   },
//   {
//     underscored: true,
//   },
//   {
//     tableName: 'food',
//   },
//   {
//     indexes: [
//       {
//         unique: true,
//         fields: ['id'],
//         name: 'idx_food_id',
//       },
//       {
//         unique: true,
//         fields: ['name'],
//         name: 'idx_food_name',
//       },
//     ],
//   },
// );

const Food = db.define('Food', {
  id: {
    type: DataTypes.STRING.BINARY,
    primaryKey: true,
    unique: true,
    allowNull: false,
    defaultValue: db.fn('uuid_to_bin', db.fn('uuid'), 1)
  },
  name: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  category_id: {
    type: DataTypes.STRING.BINARY,
    references: {
      model: 'food_category',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  brand_id: {
    type: DataTypes.STRING.BINARY,
    references: {
      model: 'brand',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  portion: {
    type: DataTypes.INTEGER
  },
  unit: {
    type: DataTypes.ENUM('g', 'ml', 'piece', 'portion', 'skewer', 'glass', 'cup', 'can'),
    defaultValue: 'portion'
  },
  callories: {
    type: DataTypes.INTEGER
  }
}, {
  indexes: [
    {
      name: 'idx_food_id',
      fields: ['id']
    },
    {
      name: 'idx_food_name',
      fields: ['name']
    }
  ]
});

module.exports = Food;
