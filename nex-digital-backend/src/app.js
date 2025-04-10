const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const User = require('./models/User');
const Transaction = require('./models/Transaction');

const app = express();

// Configurar CORS pra permitir o front-end
app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('Tables synchronized successfully');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch((error) => {
    console.error('Error connecting or syncing database:', error);
  });