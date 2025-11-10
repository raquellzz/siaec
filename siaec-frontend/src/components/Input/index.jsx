import { TextField } from '@mui/material';

export default function Input({ name, label, type = 'text', value, onChange, required = false, error = false }) {
  return (
    <TextField
      name={name}
      label={label}
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
      style={{ fontFamily: 'Montserrat', fontSize: 16, width: '100%' }}
      color="primary"
      required={required}
      error={error}
      slotProps={{ inputLabel: { shrink: type === 'date' ? true : undefined } }}
    />
  );
}
