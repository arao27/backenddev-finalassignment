const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');
const User = require('./User');
const Exercise = require('./Exercise');

const PR = sequelize.define('PR', {
  pr_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  weight: { type: DataTypes.FLOAT, allowNull: false },
  reps: { type: DataTypes.INTEGER, allowNull: false },
  date_recorded: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  percentile_general: { type: DataTypes.FLOAT },
  percentile_lifters: { type: DataTypes.FLOAT }
});

User.hasMany(PR, { foreignKey: 'user_id' });
PR.belongsTo(User, { foreignKey: 'user_id' });

Exercise.hasMany(PR, { foreignKey: 'exercise_id' });
PR.belongsTo(Exercise, { foreignKey: 'exercise_id' });

module.exports = PR;