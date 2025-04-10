import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from '@mui/material';
import api from '../services/api';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const txResponse = await api.get('/transactions', { params: { status: statusFilter } });
        const walletResponse = await api.get('/transactions/wallet');
        setTransactions(txResponse.data);
        setWallet(walletResponse.data.totalPoints);
      } catch (error) {
        alert('Failed to load data: ' + (error.response?.data.error || 'Unknown error'));
      }
    };
    fetchData();
  }, [statusFilter]);

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h1" align="center" gutterBottom sx={{ color: 'text.primary' }}>
        Dashboard
      </Typography>
      <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, mb: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary' }}>
          Saldo da Carteira
        </Typography>
        <Typography variant="h3" sx={{ color: 'text.primary', mb: 2 }}>
          {wallet.toLocaleString()} pontos
        </Typography>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          displayEmpty
          sx={{ minWidth: 120, color: 'text.primary' }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="approved">Aprovado</MenuItem>
          <MenuItem value="rejected">Reprovado</MenuItem>
          <MenuItem value="pending">Em avaliação</MenuItem>
        </Select>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Descrição</TableCell>
              <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Data</TableCell>
              <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Pontos</TableCell>
              <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{tx.description}</TableCell>
                <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{new Date(tx.transactionDate).toLocaleDateString()}</TableCell>
                <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{tx.points.toLocaleString()}</TableCell>
                <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{tx.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;