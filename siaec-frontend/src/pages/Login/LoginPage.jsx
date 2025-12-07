import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSnackbar } from '../../hooks/useSnackbar';
import ButtonUI from '../../components/ButtonUI';
import Input from '../../components/Input';
import './styles.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError(true);
      snackbar.openErrorSnackbar('Email e senha são obrigatórios.');
      return;
    }

    setError(false);
    setLoading(true);

    try {
      await login(email, password);

      navigate('/');
    } catch (err) {
      snackbar.openErrorSnackbar('Email ou senha incorretos.');
      setError(true);
      console.error(err);
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
          onChange={(e) => {
            setError(false);
            setEmail(e.target.value);
          }}
          required
          error={error}
        />
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => {
            setError(false);
            setPassword(e.target.value);
          }}
          required
          error={error}
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
