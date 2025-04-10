import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffffff' }, // Branco pra botões e textos
    secondary: { main: '#b0bec5' }, // Cinza claro pra detalhes
    background: { default: '#000000', paper: 'rgba(255, 255, 255, 0.05)' }, // Fundo preto com transparência
    text: { primary: '#ffffff', secondary: '#b0bec5' },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif", // Fonte moderna
    h1: { fontSize: '3rem', fontWeight: 600, letterSpacing: '1px' },
    h5: { fontSize: '1.5rem', fontWeight: 400 },
    button: { textTransform: 'uppercase', fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid #ffffff',
          backgroundColor: 'transparent',
          color: '#ffffff',
          padding: '8px 24px',
          '&:hover': {
            backgroundColor: '#ffffff',
            color: '#000000',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
            '&:hover fieldset': { borderColor: '#ffffff' },
            '&.Mui-focused fieldset': { borderColor: '#ffffff' },
          },
          '& .MuiInputBase-input': { color: '#ffffff' },
          '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
        },
      },
    },
  },
});

export default theme;