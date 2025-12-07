import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/authService';
import ButtonUI from '../../components/ButtonUI';
import Input from '../../components/Input';
import SelectUI from '../../components/SelectUI';
import '../Login/styles.css';
import { Snackbar } from '@mui/material';
import { useSnackbar } from '../../hooks/useSnackbar';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    taxId: '',
    dateOfBirth: '',
    role: 'CLIENT',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.dateOfBirth ||
      !formData.email ||
      !formData.name ||
      !formData.password ||
      !formData.phone ||
      !formData.taxId ||
      !formData.username
    ) {
      snackbar.openErrorSnackbar('Preencha todos os campos');
    } else {
      setLoading(true);

      try {
        await register(formData);

        snackbar.openSuccessSnackbar('Cadastro feito com sucesso!');
        navigate('/login');
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          snackbar.openErrorSnackbar(err.response.data.message);
        } else {
          snackbar.openErrorSnackbar('Falha ao realizar o cadastro. Tente novamente.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Cadastro de novo usuário</h2>
      <div className="form">
        <Input label="Nome completo" type="text" name="name" value={formData.name} onChange={handleChange} required />

        <Input
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <Input label="E-mail" type="email" name="email" value={formData.email} onChange={handleChange} required />

        <Input
          label="Senha"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Input label="Telefone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <Input label="CPF/CNPJ" type="text" name="taxId" value={formData.taxId} onChange={handleChange} required />

        <Input
          label="Data de nascimento"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />

        <SelectUI
          label="Eu sou"
          name="role"
          value={formData.role}
          handleChange={handleChange}
          options={[
            {
              value: 'CLIENT',
              item: 'Cliente',
            },
            {
              value: 'ARTISAN',
              item: 'Artesão',
            },
            {
              value: 'EVENT_PLANNER',
              item: 'Cerimonialista',
            },
            {
              value: 'CURATOR',
              item: 'Curador',
            },
            {
              value: 'DELIVERY_PERSON',
              item: 'Entregador',
            },
          ]}
        />

        <ButtonUI loading={loading} text="Cadastrar" onClick={handleSubmit} fullWidth />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <p>
          Já tem uma conta?
          <Link to="/login" style={{ color: '#c66e19' }}>
            {' '}
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
