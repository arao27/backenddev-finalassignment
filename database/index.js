const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

module.exports = { sequelize, testConnection };