const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Transaction = sequelize.define('Transaction', {
  cpf: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  transactionDate: { type: DataTypes.DATE, allowNull: false },
  points: { type: DataTypes.INTEGER, allowNull: false },
  value: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.ENUM('approved', 'rejected', 'pending'), allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

Transaction.belongsTo(User, { foreignKey: 'userId' });
module.exports = Transaction;