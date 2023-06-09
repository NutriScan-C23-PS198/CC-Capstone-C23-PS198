const { DataTypes } = require('sequelize');
const db = require('../../databases/index');
const uuid = require('node-uuid');

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
    // defaultValue: DataTypes.UUIDV4,
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
  name: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING(256),
    allowNull: true,
  },
  category_id: {
    type: DataTypes.STRING.BINARY,
    references: {
      model: 'food_category',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    get: function() {
      if (this.getDataValue('category_id'))
        return uuid.unparse(this.getDataValue('category_id'));
    },
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
},
{
  timestamps: false,
  tableName: 'food',
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
