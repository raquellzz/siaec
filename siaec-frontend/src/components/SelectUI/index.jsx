import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SelectUI({ label, value, options, handleChange, name }) {
  return (
    <FormControl fullWidth style={{ textAlign: 'left' }}>
      <InputLabel id={`select-${name}`}>{label}</InputLabel>
      <Select labelId={`select-${name}`} name={name} value={value} label={label} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem value={option.value}>{option.item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
