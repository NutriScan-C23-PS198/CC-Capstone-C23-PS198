require('dotenv').config();

const { Sequelize } = require('sequelize');

const SQL = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,

    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },

  },
);

module.exports = SQL;
