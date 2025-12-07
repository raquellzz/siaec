import { CircularProgress } from '@mui/material';
import './styles.css';

export default function Carregando() {
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  );
}
