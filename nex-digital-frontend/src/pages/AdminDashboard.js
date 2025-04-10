import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Input,
  MenuItem,
  Select,
} from '@mui/material';
import api from '../services/api';

const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    cpf: '',
    description: '',
    startDate: '',
    endDate: '',
    minValue: '',
    maxValue: '',
    status: '',
  });

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/transactions', { params: filters });
      setTransactions(response.data);
    } catch (error) {
      alert('Failed to load transactions: ' + (error.response?.data.error || 'Unknown error'));
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Por favor, selecione uma planilha!');
    const formData = new FormData();
    formData.append('file', file);
    try {
      await api.post('/transactions/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Planilha enviada com sucesso!');
      setFile(null);
      fetchTransactions();
    } catch (error) {
      alert('Erro ao enviar planilha: ' + (error.response?.data.error || 'Erro desconhecido'));
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h1" align="center" gutterBottom sx={{ color: 'text.primary' }}>
        Admin Dashboard
      </Typography>

      <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, mb: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary' }}>
          Fazer Upload da Planilha de Transações
        </Typography>
        <form onSubmit={handleFileUpload} style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
          <Input
            type="file"
            inputProps={{ accept: '.xlsx, .xls' }}
            onChange={(e) => setFile(e.target.files[0])}
            sx={{ color: 'text.primary' }}
          />
          <Button type="submit" variant="contained">
            Enviar Planilha
          </Button>
        </form>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          Formato esperado: CPF, Descrição da transação, Data da transação, Valor em pontos, Valor, Status
        </Typography>
      </Box>

      <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Filtros do Relatório de Transações
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <TextField
            label="CPF"
            name="cpf"
            value={filters.cpf}
            onChange={handleFilterChange}
            size="small"
          />
          <TextField
            label="Descrição"
            name="description"
            value={filters.description}
            onChange={handleFilterChange}
            size="small"
          />
          <TextField
            label="Data Inicial"
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Data Final"
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Valor Mínimo"
            type="number"
            name="minValue"
            value={filters.minValue}
            onChange={handleFilterChange}
            size="small"
          />
          <TextField
            label="Valor Máximo"
            type="number"
            name="maxValue"
            value={filters.maxValue}
            onChange={handleFilterChange}
            size="small"
          />
          <Select
            label="Status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            size="small"
            displayEmpty
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="approved">Aprovado</MenuItem>
            <MenuItem value="rejected">Reprovado</MenuItem>
            <MenuItem value="pending">Em avaliação</MenuItem>
          </Select>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>CPF</TableCell>
              <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Descrição</TableCell>
              <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Data</TableCell>
              <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Pontos</TableCell>
              <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Valor</TableCell>
              <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{tx.cpf}</TableCell>
                <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{tx.description}</TableCell>
                <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{new Date(tx.transactionDate).toLocaleDateString()}</TableCell>
                <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{tx.points.toLocaleString()}</TableCell>
                <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{tx.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                <TableCell sx={{ color: 'text.primary', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{tx.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;