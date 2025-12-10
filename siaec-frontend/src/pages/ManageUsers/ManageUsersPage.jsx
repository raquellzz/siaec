import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers, updateUserStatus } from '../../services/userService';
import Header from '../../components/Header/Header';
import Carregando from '../../components/Carregando';
import { Pagination } from '@mui/material';
import './ManageUsersPage.css';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers(page, 10);
      setUsers(data.content || []);
      setTotalPages(data.totalPages || 0);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar lista de usuários.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  const handleStatusChange = async (userId, currentStatus) => {
    const isBanned = currentStatus === 'BANNED' || currentStatus === 'SUSPENDED';
    const newStatus = isBanned ? 'ACTIVE' : 'BANNED';
    const actionText = isBanned ? 'ATIVAR' : 'BANIR';

    if (window.confirm(`Tem certeza que deseja ${actionText} este usuário?`)) {
      try {
        await updateUserStatus(userId, newStatus);
        loadUsers(); 
      } catch (err) {
        alert('Erro ao atualizar status.');
      }
    }
  };

  const translateRole = (role) => {
    switch (role) {
      case 'ROLE_ARTISAN': return 'Artesão';
      case 'ROLE_CLIENT': return 'Cliente';
      case 'ROLE_EVENT_PLANNER': return 'Cerimonialista';
      case 'ROLE_DELIVERY': return 'Entregador';
      case 'ROLE_ADMIN': return 'Administrador';
      default: return role;
    }
  };

  const translateStatus = (status) => {
    switch (status) {
      case 'ACTIVE': return 'Ativo';
      case 'BANNED': return 'Banido';
      case 'SUSPENDED': return 'Suspenso';
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'ACTIVE': return 'status-ativo';
      case 'BANNED': return 'status-banido';
      case 'SUSPENDED': return 'status-suspenso';
      default: return '';
    }
  };

  if (loading) return <Carregando />;

  return (
    <div className="manage-users-page">
      <Header />
      
      <div className="admin-container">
        
        <h2 className="page-title">Gerenciar Usuários</h2>

        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome Completo</th>
                    <th>Perfil</th>
                    <th>Status</th>
                    <th>Data de Registro</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.userId}>
                        <td>#{user.userId.substring(0, 4)}...</td> 
                        <td className="user-name">{user.name}</td>
                        <td>{translateRole(user.role)}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(user.statusAccount)}`}>
                            {translateStatus(user.statusAccount)}
                          </span>
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString('pt-BR')}</td>
                        <td className="actions-cell">
                          <Link to={`/admin/users/${user.userId}`} className="btn-details">
                            Ver detalhes
                          </Link>
                          
                          {user.role !== 'ROLE_ADMIN' && (
                            <button 
                                className={`btn-action ${user.statusAccount === 'BANNED' ? 'btn-activate' : 'btn-ban'}`}
                                onClick={() => handleStatusChange(user.userId, user.statusAccount)}
                            >
                                {user.statusAccount === 'BANNED' ? 'Ativar' : 'Banir'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>Nenhum usuário encontrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination-container">
                <Pagination 
                    count={totalPages} 
                    page={page + 1} 
                    onChange={(e, val) => setPage(val - 1)} 
                    shape="rounded"
                    color="primary"
                />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageUsersPage;