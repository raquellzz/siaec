import { TextField } from '@mui/material';

export default function Input({
  name,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  error = false,
  rows = undefined,
  multiline = false,
  ...otherProps
}) {
  return (
    <TextField
      name={name}
      label={label}
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 16, width: '100%' }}
      color="primary"
      required={required}
      error={error}
      multiline={multiline}
      rows={rows}
      slotProps={{ inputLabel: { shrink: type === 'date' ? true : undefined } }}
      {...otherProps}
    />
  );
}
