import { TextField } from '@mui/material';

export default function Input({ label, type = 'text', value, onChange, required = false, error = false }) {
  return (
    <TextField
      label={label}
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
      style={{ fontFamily: 'Montserrat', fontSize: 16, width: '100%' }}
      color="primary"
      required={required}
      error={error}
    />
  );
}
