const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const User = sequelize.define('User', {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING },
  weight_class: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'user' }
});

module.exports = User;