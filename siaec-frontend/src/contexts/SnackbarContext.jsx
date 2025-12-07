import { createContext, useState } from 'react';
import { snackbarVariantEnum } from '../enums/SnackbarVariantEnum';

// eslint-disable-next-line react-refresh/only-export-components
export const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState('');

  const openSnackbar = (message, variant) => {
    setIsOpen(true);
    setVariant(variant);
    setMessage(message);
  };

  const closeSnackbar = () => {
    setIsOpen(false);
    setVariant('');
    setMessage('');
  };

  const openSuccessSnackbar = (message) => {
    openSnackbar(message, snackbarVariantEnum.success);
  };

  const openErrorSnackbar = (message) => {
    openSnackbar(message, snackbarVariantEnum.error);
  };

  const openWarningSnackbar = (message) => {
    openSnackbar(message, snackbarVariantEnum.warning);
  };

  return (
    <SnackbarContext.Provider
      value={{ message, isOpen, variant, closeSnackbar, openErrorSnackbar, openSuccessSnackbar, openWarningSnackbar }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
