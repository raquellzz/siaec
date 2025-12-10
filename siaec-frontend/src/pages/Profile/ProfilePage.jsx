import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <div className="profile-page-container">
      <h1>Meu Perfil</h1>

      <div className="profile-card">
        <h2>Minhas Informações</h2>
        <div className="profile-info">
          <p>
            <strong>Nome:</strong> {user.name}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Telefone:</strong> {user.phone}
          </p>
          <p>
            <strong>CPF/CNPJ:</strong> {user.taxId}
          </p>
          <p>
            <strong>Tipo de Conta:</strong> <span className="role-tag">{user.role}</span>
          </p>
        </div>
      </div>

      <div className="profile-card">
        <h2>Minhas Ações</h2>

        {user.role === 'ARTISAN' && (
          <Link to="/meus-produtos" className="profile-action-link">
            Gerenciar Meus Produtos
          </Link>
        )}

        {user.role === 'ADMIN' && (
          <>
          <Link to="/admin/dashboard" className="profile-action-link">
            Painel de Administrador
          </Link>
          <Link to="/admin/usuarios" className="profile-action-link">
            Gerenciar Usuários
          </Link>
          <Link to="/admin/categorias" className="profile-action-link">
            Gerenciar Categorias
          </Link>
          </>
        )}

        {user.role === 'CLIENT' && (
          <Link to="/meus-pedidos" className="profile-action-link">
            Histórico de Pedidos
          </Link>
        )}
        {user.role === 'EVENT_PLANNER' && (
          <Link to="/meus-eventos" className="profile-action-link">
            Gerenciar Meus Eventos
          </Link>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
