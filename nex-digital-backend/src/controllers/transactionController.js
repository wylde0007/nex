const XLSX = require('xlsx');
const Transaction = require('../models/Transaction');
const { Op } = require('sequelize');

const uploadSpreadsheet = async (req, res) => {
  try {
    const file = req.file;
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const transactions = data.map((row) => ({
      cpf: row['CPF'],
      description: row['Descrição da transação'],
      transactionDate: new Date(row['Data da transação']),
      points: parseInt(row['Valor em pontos']),
      value: parseFloat(row['Valor'].toString().replace(',', '.')),
      status: row['Status'].toLowerCase() === 'aprovado' ? 'approved' : row['Status'].toLowerCase() === 'reprovado' ? 'rejected' : 'pending',
      userId: req.user.id,
    }));

    await Transaction.bulkCreate(transactions);
    return res.status(201).json({ message: 'Transactions uploaded successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to upload spreadsheet' });
  }
};

const getTransactions = async (req, res) => {
  const { cpf, description, startDate, endDate, minValue, maxValue, status } = req.query;
  const where = { userId: req.user.id };
  if (cpf) where.cpf = cpf;
  if (description) where.description = { [Op.like]: `%${description}%` };
  if (startDate) where.transactionDate = { [Op.gte]: new Date(startDate) };
  if (endDate) where.transactionDate = { [Op.lte]: new Date(endDate) };
  if (minValue) where.value = { [Op.gte]: minValue };
  if (maxValue) where.value = { [Op.lte]: maxValue };
  if (status) where.status = status;

  const transactions = await Transaction.findAll({ where });
  return res.json(transactions);
};

const getWallet = async (req, res) => {
  const totalPoints = await Transaction.sum('points', {
    where: { userId: req.user.id, status: 'approved' },
  });
  return res.json({ totalPoints: totalPoints || 0 });
};

module.exports = { uploadSpreadsheet, getTransactions, getWallet };