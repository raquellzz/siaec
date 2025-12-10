import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../../services/orderService';
import Header from '../../components/Header/Header';
import Carregando from '../../components/Carregando';
import { Pagination } from '@mui/material'; 
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getMyOrders(page);
        setOrders(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        setError('Não foi possível carregar o histórico de pedidos.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const translateStatus = (status) => status ? 'Concluído' : 'Processando';

  if (loading) return <Carregando />;

  return (
    <div className="order-history-page">
      <Header />
      <div className="container">
        <h2>Meus Pedidos</h2>
        
        {error && <p className="error-msg">{error}</p>}

        {orders.length === 0 ? (
          <p className="no-orders">Você ainda não fez nenhum pedido.</p>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.orderId} className="order-card-summary">
                <div className="order-header">
                  <span className="order-date">{formatDate(order.createdAt)}</span>
                  <span className={`order-status ${order.status ? 'completed' : 'pending'}`}>
                    {translateStatus(order.status)}
                  </span>
                </div>
                <div className="order-body">
                  <p><strong>Pedido:</strong> #{order.orderId.substring(0, 8)}...</p>
                  <p><strong>Total:</strong> R$ {order.total.toFixed(2).replace('.', ',')}</p>
                  <p><strong>Itens:</strong> {order.totalItems}</p>
                </div>
                <div className="order-footer">
                  <Link to={`/pedidos/${order.orderId}`} className="btn-details">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
            <div className="pagination-wrapper">
                <Pagination 
                    count={totalPages} 
                    page={page + 1} 
                    onChange={(e, val) => setPage(val - 1)} 
                    color="primary"
                />
            </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;