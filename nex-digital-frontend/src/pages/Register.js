import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import api from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }
    try {
      await api.post('/auth/register', { name, email, password });
      window.location.href = '/';
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data.error || 'Unknown error'));
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 12 }}>
      <Box sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h1" gutterBottom sx={{ color: 'text.primary' }}>
          Nex Digital
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary', mb: 4 }}>
          Crie sua conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
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
            Register
          </Button>
          <Typography sx={{ color: 'text.secondary' }}>
            Já tem conta? <a href="/" style={{ color: '#ffffff' }}>Faça login</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;