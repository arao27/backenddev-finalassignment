const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

const Exercise = sequelize.define('Exercise', {
  exercise_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  units: { type: DataTypes.ENUM('weight','reps'), allowNull: false }
});

module.exports = Exercise;