import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/authService';

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
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register(formData);

      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Falha ao realizar o cadastro. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Cadastro de Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome Completo:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Username (Apelido):</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Telefone:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <label>CPF/CNPJ (Tax ID):</label>
          <input type="text" name="taxId" value={formData.taxId} onChange={handleChange} required />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Eu sou:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="CLIENTE">Cliente</option>
            <option value="ARTESAO">Artesão</option>
            <option value="CURADOR">Curador</option>
            <option value="ENTREGADOR">Entregador</option>
            <option value="CERIMONIALISTA">Cerimonialista</option>
          </select>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        <p>
          Já tem uma conta?
          <Link to="/login"> Faça o login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
