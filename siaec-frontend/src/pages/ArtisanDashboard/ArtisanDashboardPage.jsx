import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import Carregando from '../../components/Carregando/index.jsx';
import './ArtisanDashboardPage.css';
import artisanImage from '../../assets/artisan.png';

export default function ArtisanDashboardPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const fetchStatistics = async () => {
    //   try {
    //     setLoading(true);
    //     const data = await getMyOrders(0, 5);
    //     setEvents(data.content || []);
    //   } catch (err) {
    //     setError('Falha ao carregar o histórico de pedidos.');
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // if (user) {
    //   fetchStatistics();
    // }
  }, [user]);

  if (loading) return <Carregando />;
  if (error) return <div className="error-message">{error}</div>;

  const lastEvent = events[0];

  return (
    <div className="dashboard-page">
      <div className="dashboard-profile-header">
        <img src={artisanImage} alt="Perfil" className="profile-image" />
        <h2>{user.name}</h2>
        <p className="description">{user.description}</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-column-left">
          <div className="dashboard-card">
            <h3>Minhas Informações</h3>
            <div className="personal-info-grid">
              <p>
                <strong>E-mail</strong>
                {user.email}
              </p>
              <p>
                <strong>Telefone</strong>
                {user.phone}
              </p>
            </div>
            <Link to="/perfil/editar" className="edit-link">
              <button className="edit-button">Editar perfil</button>
            </Link>
          </div>

          {/* <div className="dashboard-card">
            <h3>Próximo evento</h3>
            {lastEvent ? (
              <div className="event">
                <p>Feirinha de artesanato</p>
                <p>Data: 15/11 /2025- 18/11/2025</p>
                <p>Local: UFRN, setor III</p>
              </div>
            ) : (
              <p>Você não tem próximos eventos agendados no momento.</p>
            )}
          </div> */}
        </div>

        <div className="dashboard-column-right">
          {/* <div className="dashboard-card">
            <h3>Estatísticas</h3>
            <div className="info">
              <div className="info-card">
                <h4>Vendas no mês</h4>
                <span>R$ 2.200,00</span>
              </div>
              <div className="info-card">
                <h4>Produtos no catálogo</h4>
                <span>42</span>
              </div>
              <div className="info-card">
                <h4>Pedidos</h4>
                <span>10</span>
              </div>
            </div>
          </div> */}

          <div className="dashboard-card">
            <h3>Acesso rápido</h3>
            <div className="row">
              <Link to="/meus-produtos" className="edit-link">
                <button className="edit-button">Gerenciar produtos</button>
              </Link>
              <Link to="/perfil" className="edit-link">
                <button className="edit-button">Gerenciar vendas</button>
              </Link>
              <Link to="/meus-eventos-salvos" className="edit-link">
                <button className="edit-button">Meus eventos</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
