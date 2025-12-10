import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';
import Header from '../../components/Header/Header';
import Carregando from '../../components/Carregando';
import './OrderDetailPage.css';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError('Erro ao carregar detalhes do pedido.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <Carregando />;
  if (error) return <div className="error-container"><Header /><p>{error}</p></div>;
  if (!order) return null;

  return (
    <div className="order-detail-page">
      <Header />
      <div className="container detail-container">
        
        <div className="detail-header">
          <h2>Pedido #{order.orderId.substring(0, 8)}</h2>
          <span className={`status-badge ${order.status ? 'success' : 'warning'}`}>
            {order.status ? 'Concluído' : 'Em Processamento'}
          </span>
        </div>

        <div className="detail-grid">
          <div className="info-card">
            <h3>Informações de Entrega</h3>
            <p><strong>Endereço:</strong> {order.address}</p>
            <p><strong>Data:</strong> {new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
            <p><strong>Pagamento:</strong> {order.paymentMethod}</p>
          </div>

          <div className="info-card">
            <h3>Resumo Financeiro</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>R$ {order.subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="summary-row">
              <span>Frete:</span>
              <span>R$ {order.shippingFee.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>R$ {order.total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </div>

        <div className="items-section">
          <h3>Itens do Pedido</h3>
          <div className="items-table">
            <div className="table-header">
              <span>Produto</span>
              <span>Qtd</span>
              <span>Unitário</span>
              <span>Total</span>
            </div>
            {order.items.map((item, index) => (
              <div key={index} className="table-row">
                <div className="product-info">
                   <span>{item.productName}</span>
                </div>
                <span>{item.quantity}</span>
                <span>R$ {item.unitPrice.toFixed(2).replace('.', ',')}</span>
                <span>R$ {item.subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;