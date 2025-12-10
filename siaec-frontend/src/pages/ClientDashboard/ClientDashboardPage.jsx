import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getMyOrders } from '../../services/orderService';
import { formatDate } from '../../utils/formatDate';
import Header from '../../components/Header/Header.jsx';
import Carregando from '../../components/Carregando';
import './ClientDashboardPage.css';
import client from '../../assets/client.png';

const OrderStatusTracker = ({ status }) => {
  const statuses = ['Pedido Feito', 'Confirmado', 'Pronto', 'Aguardando Entregador', 'Saiu para Entrega', 'Entregue'];
  const statusMap = {
    AWAITING_PAYMENT: 0,
    PAID: 1,
    PREPARING: 2,
    IN_TRANSIT: 4,
    COMPLETED: 5,
  };

  const currentIndex = statusMap[status] || 0;

  return (
    <div className="status-tracker-wrapper">
      <div className="status-tracker">
        {statuses.map((s, index) => (
          <div key={s} className={`status-step ${index <= currentIndex ? 'completed' : ''}`}>
            <span className="dot"></span>
            <p>{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

function ClientDashboardPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getMyOrders(0, 5);
        setOrders(data.content || []);
      } catch (err) {
        setError('Falha ao carregar o histórico de pedidos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) return <Carregando />;
  if (!user) return <div className="error-message">Usuário não autenticado.</div>;

  const lastOrder = orders[0];

  return (
    <div className="client-dashboard-page">
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-profile-header">
          <img src={client} alt="Perfil" className="profile-image" />
          <h2>{user.name}</h2>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-column-left">
            <div className="dashboard-card personal-data-card">
              <h3>Minhas Informações</h3>
              <div className="personal-info-grid">
                <p>
                  <strong>Nome Completo</strong>
                  {user.name}
                </p>
                <p>
                  <strong>E-mail</strong>
                  {user.email}
                </p>
                <p>
                  <strong>Telefone</strong>
                  {user.phone}
                </p>
              </div>
              <Link to="/perfil" className="edit-link">
                <button className="edit-button">Editar perfil</button>
              </Link>
            </div>

            <div className="dashboard-card history-card">
              <h3>Histórico de Pedidos</h3>
              <div className="order-history-list">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <div key={order.orderId} className="order-item">
                      {order.artisanId ? <p>{order.artisanName}</p> : <p></p>}
                      <p>{formatDate(order.createdAt)}</p>
                      <p>{order.status === 'COMPLETED' ? 'Concluído' : 'Em Andamento'}</p>
                      <Link to={`/pedidos/${order.orderId}`}>Ver Pedido</Link>
                    </div>
                  ))
                ) : (
                  <p>Nenhum pedido realizado ainda.</p>
                )}
              </div>
            </div>
          </div>

          <div className="dashboard-column-right">
            <div className="dashboard-card last-order-card">
              <h3>Último Pedido #{lastOrder ? lastOrder.orderId.substring(0, 8) : 'N/A'}</h3>
              {lastOrder ? (
                <div className="order-tracking-section">
                  <OrderStatusTracker status={lastOrder.status} />
                </div>
              ) : (
                <p>Realize seu primeiro pedido para acompanhar o status.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboardPage;
