import { SnackbarContent } from '@mui/material';
import SnackbarMUI from '@mui/material/Snackbar';
import { useSnackbar } from '../../hooks/useSnackbar';
import './styles.css';

export default function Snackbar() {
  const snackbar = useSnackbar();

  return (
    <SnackbarMUI
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={snackbar.isOpen}
      autoHideDuration={5000}
      onClose={snackbar.closeSnackbar}
    >
      <SnackbarContent
        message={snackbar.message}
        classes={{ root: snackbar.variant !== '' ? `snackbar-${snackbar.variant}` : '' }}
      />
    </SnackbarMUI>
  );
}
