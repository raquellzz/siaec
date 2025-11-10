import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ButtonUI from '../../components/ButtonUI';
import Input from '../../components/Input';
import './styles.css';
import { Snackbar } from '@mui/material';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setIsSnackbarOpen(true);
      setError('Email e senha são obrigatórios.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await login(email, password);

      navigate('/');
    } catch (error) {
      setError('Email ou senha incorretos.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <div className="form">
        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={error}
        />
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={error !== null}
        />

        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={5000}
          onClose={() => setIsSnackbarOpen(false)}
          message={error}
        />

        <ButtonUI text="Entrar" loading={loading} onClick={handleSubmit} fullWidth />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p>
          Não tem uma conta?
          <Link to="/register" style={{ color: '#c66e19' }}>
            {' '}
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
