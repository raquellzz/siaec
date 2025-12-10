import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonUI from '../../components/ButtonUI';
import Input from '../../components/Input';
import '../Login/styles.css';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useAuth } from '../../hooks/useAuth';
import { saveArtisan } from '../../services/artisanService';
import { roleEnum } from '../../enums/RoleEnum';
import { updateUserProfile } from '../../services/userService';

function EditProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    username: '',
    phone: '',
    taxId: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { user, updateUser } = useAuth();

  useEffect(() => {
    setFormData({
      name: user.name,
      description: user.description,
      email: user.email,
      username: user.username,
      phone: user.phone,
      taxId: user.taxId,
      dateOfBirth: user.dateOfBirth,
      password: '',
      confirmPassword: '',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const data = {
        name: formData.name,
        description: formData.description,
        username: formData.username,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        password: formData.password,
      };
      if (formData.password.length === 0) delete data.password;
      if (formData.username === user.username) delete data.username;
      if (user.role !== roleEnum.artisan) delete data.description;

      const updateFunction = user.role === roleEnum.artisan ? saveArtisan : updateUserProfile;

      const userUpdated = await updateFunction(data, user.userId);
      console.log(userUpdated);
      updateUser(userUpdated);
      snackbar.openSuccessSnackbar('Perfil salvo com sucesso!');
      navigate('/perfil');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        snackbar.openErrorSnackbar(err.response.data.message);
      } else {
        snackbar.openErrorSnackbar('Falha ao salvar o perfil.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, password: value });
    setErrorPassword(value !== formData.confirmPassword);
  };

  const handleChangeConfirmPassword = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, confirmPassword: value });
    setErrorPassword(value !== formData.password);
  };

  return (
    <div className="form-container">
      <h2>Editar perfil</h2>
      <div className="form">
        <Input label="Nome completo" type="text" name="name" value={formData.name} onChange={handleChange} required />

        {user.role === roleEnum.artisan && (
          <Input
            label="Sobre você"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            required
          />
        )}

        <Input
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <Input label="E-mail" type="email" name="email" value={formData.email} disabled />

        <Input label="Telefone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <Input label="CPF/CNPJ" type="text" name="taxId" value={formData.taxId} disabled />

        <Input
          label="Data de nascimento"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />

        <Input
          label="Nova senha"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChangePassword}
          error={errorPassword}
        />

        <Input
          label="Confirmar senha"
          type="password"
          name="password"
          value={formData.confirmPassword}
          onChange={handleChangeConfirmPassword}
          error={errorPassword}
        />

        {errorPassword && <span style={{ color: '#b91c1c' }}>As senhas não correspondem!</span>}

        <ButtonUI loading={loading} text="Salvar" onClick={handleSubmit} fullWidth />
      </div>
    </div>
  );
}

export default EditProfilePage;
