import { Button } from '@mui/material';

export default function ButtonUI({ loading = false, onClick, text, fullWidth = false }) {
  return (
    <Button
      variant="contained"
      disabled={loading}
      onClick={onClick}
      color="primary"
      style={{
        fontFamily: 'Montserrat',
        textTransform: 'capitalize',
        fontWeight: 500,
        fontSize: 16,
        width: fullWidth ? '100%' : 'fit-content',
        padding: '10px 32px',
      }}
    >
      {loading ? 'Carregando...' : text}
    </Button>
  );
}
