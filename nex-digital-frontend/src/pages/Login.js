import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import api from '../services/api';

const Login = ({ setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      const decoded = require('jwt-decode').jwtDecode(response.data.token);
      setUserRole(decoded.role);
      window.location.href = '/dashboard';
    } catch (error) {
      alert('Login failed: ' + (error.response?.data.error || 'Unknown error'));
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 12 }}>
      <Box sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h1" gutterBottom sx={{ color: 'text.primary' }}>
          Nex Digital
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary', mb: 4 }}>
          Faça login para continuar
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
          <Typography sx={{ color: 'text.secondary' }}>
            Não tem conta? <a href="/register" style={{ color: '#ffffff' }}>Registre-se</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;