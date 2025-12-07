import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext.jsx';
import App from './App.jsx';
import './index.css';
import Snackbar from './components/Snackbar/index.jsx';
import { SnackbarProvider } from './contexts/SnackbarContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c66e19',
    },
    secondary: {
      main: '#c49a22',
    },
  },
  typography: {
    fontFamily: ["'Plus Jakarta Sans'", 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <AuthProvider>
          <CartProvider>
            <App />
            <Snackbar />
          </CartProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>,
);
