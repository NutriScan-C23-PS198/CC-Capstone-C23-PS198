const Sequelize = require('sequelize');
const db = require('../databases/index');

const Foods = db.define(
  'Foods',
  {
    text: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: true,
  },
  {
    tableName: 'foods',
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
    ],
  },
);

module.exports = Foods;
