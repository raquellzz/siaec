import React, { useEffect, useState } from 'react';
import { getMySales, updateOrderStatus } from '../../services/orderService';
import Header from '../../components/Header/Header';
import Carregando from '../../components/Carregando';
import { Pagination } from '@mui/material';
import './MySalesPage.css';

const MySalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const data = await getMySales(page);
      setSales(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      alert('Erro ao carregar vendas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [page]);

  const handleToggleStatus = async (orderId, currentStatus) => {
    const newStatus = !currentStatus;
    const confirmMsg = newStatus 
      ? "Deseja marcar este pedido como CONCLUÍDO/ENVIADO?" 
      : "Deseja reabrir este pedido como PENDENTE?";

    if (window.confirm(confirmMsg)) {
      try {
        await updateOrderStatus(orderId, newStatus);
        fetchSales();
      } catch (err) {
        alert("Erro ao atualizar status.");
      }
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

  if (loading) return <Carregando />;

  return (
    <div className="my-sales-page">
      <Header />
      <div className="sales-container">
        <h2 className="page-title">Gerenciar Minhas Vendas</h2>

        {sales.length === 0 ? (
          <div className="no-sales">Nenhuma venda realizada ainda.</div>
        ) : (
          <div className="sales-list">
            {sales.map((sale) => (
              <div key={sale.orderId} className="sale-card">
                <div className="sale-header">
                  <div className="sale-info">
                    <span className="sale-date">{formatDate(sale.createdAt)}</span>
                    <span className="sale-client">Cliente: <strong>{sale.clientName}</strong></span>
                  </div>
                  <span className={`status-badge ${sale.status ? 'success' : 'warning'}`}>
                    {sale.status ? 'Concluído' : 'Pendente'}
                  </span>
                </div>

                <div className="sale-items">
                  {sale.myItems.map((item, idx) => (
                    <div key={idx} className="sale-item-row">
                      <span>{item.quantity}x {item.productName}</span>
                      <span>R$ {item.subtotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                  ))}
                </div>

                <div className="sale-footer">
                  <div className="sale-total">
                    Total a receber: <strong>R$ {sale.myTotal.toFixed(2).replace('.', ',')}</strong>
                  </div>
                  
                  <div className="sale-actions">
                    <div className="address-tooltip" title={sale.address}>
                       📍 Ver Endereço
                    </div>
                    <button 
                        className={`btn-status ${sale.status ? 'btn-reopen' : 'btn-complete'}`}
                        onClick={() => handleToggleStatus(sale.orderId, sale.status)}
                    >
                        {sale.status ? 'Reabrir Pedido' : 'Marcar como Enviado'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
            <div className="pagination-wrapper">
                <Pagination count={totalPages} page={page + 1} onChange={(e, val) => setPage(val - 1)} />
            </div>
        )}
      </div>
    </div>
  );
};

export default MySalesPage;