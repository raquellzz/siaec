import { useContext } from 'react';
import { SnackbarContext } from '../contexts/SnackbarContext';

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar deve ser usado dentro de um SnackbarProvider');
  }
  return context;
};
