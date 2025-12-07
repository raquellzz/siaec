import { Button } from '@mui/material';

export default function ButtonUI({
  loading = false,
  onClick,
  text,
  fullWidth = false,
  color = 'primary',
  variant = 'contained',
}) {
  return (
    <Button
      variant={variant}
      loading={loading}
      onClick={onClick}
      color={color}
      style={{
        fontFamily: 'Plus Jakarta Sans',
        textTransform: 'capitalize',
        letterSpacing: 0,
        fontWeight: 500,
        fontSize: 16,
        width: fullWidth ? '100%' : 'fit-content',
        padding: '10px 32px',
      }}
    >
      {text}
    </Button>
  );
}
