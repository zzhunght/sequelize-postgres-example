const { Sequelize } = require('sequelize');

HOST = 'localhost'
DATABASE_NAME = "postgres"
USER = "postgres"
PASSWORD = "Haitac012"

const sequelize = new Sequelize(DATABASE_NAME, USER, PASSWORD, {
  host: HOST,
  port: 5432,
  dialect: 'postgres',
});

module.exports = sequelize
