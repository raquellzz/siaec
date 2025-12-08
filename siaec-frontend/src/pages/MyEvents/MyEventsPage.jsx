import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyEvents, deleteEvent } from '../../services/eventService';
import ButtonUI from '../../components/ButtonUI';
import './MyEventsPage.css'; 
import BackButton from '../../components/BackButton/BackButton';

function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('Todos'); 

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getMyEvents();
      // Assume-se que o backend retorna um Page<Event>, logo usamos data.content
      setEvents(data.content || []); 
      setError(null);
    } catch (err) {
      setError('Falha ao carregar seus eventos. Verifique sua conexão ou permissões.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // --- Lógica de Deleção (Igual ao MyProductsPage) ---
  const handleDelete = async (eventId) => {
    if (window.confirm('Tem certeza que deseja cancelar/excluir este evento?')) {
      try {
        await deleteEvent(eventId);
        loadEvents(); // Recarrega a lista
      } catch (err) {
        alert('Falha ao deletar o evento: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  // --- Helpers Visuais ---

  // Função para calcular status baseado na data (caso o backend não retorne o status pronto)
  const getStatus = (event) => {
    // Se o backend já retornar o status, use: return event.status;
    
    if (event.status) return event.status; // Prioridade para o backend

    const now = new Date();
    const start = new Date(event.dateStart);
    const end = new Date(event.dateEnd);

    // Lógica simples de exemplo
    if (end < now) return 'Concluído';
    if (start > now) return 'Próximo'; 
    return 'Ativo';
  };

  const getStatusStyle = (statusLabel) => {
    switch (statusLabel) {
      case 'Ativo': 
      case 'Próximo': return 'status-ativo';
      case 'Concluído': return 'status-concluido';
      case 'Cancelado': return 'status-cancelado';
      default: return 'status-ativo';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Filtragem no Frontend (apenas visual, já que pegamos paginado do back)
  const getFilteredEvents = () => {
    if (filter === 'Todos') return events;
    return events.filter(event => getStatus(event) === filter);
  };

  const tabs = ['Todos', 'Próximo', 'Concluído', 'Cancelado'];

  // --- Renderização ---
  if (loading) return <div className="my-events-container">Carregando eventos...</div>;
  if (error) return <div className="my-events-container" style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="my-events-container">
      {/* Cabeçalho */}
      <div className="header-section">
        <h2 className="page-title">Gerenciar Meus Eventos</h2>
        <Link to="/meus-eventos/novo">
          <ButtonUI text="Criar Novo Evento" onClick={() => {}} />
        </Link>
      </div>

      {/* Abas de Navegação */}
      <div className="event-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${filter === tab ? 'active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab === 'Próximo' ? 'Próximos' : tab === 'Concluído' ? 'Concluídos' : tab === 'Cancelado' ? 'Cancelados' : tab}
          </button>
        ))}
      </div>

      {/* Grid de Cards */}
      <div className="event-cards-grid">
        {getFilteredEvents().length === 0 ? (
          <div className="no-events">
            <p>Nenhum evento encontrado nesta categoria.</p>
          </div>
        ) : (
          getFilteredEvents().map((event) => {
            const currentStatus = getStatus(event);

            return (
              <div key={event.eventId} className="event-card">
                <div className="card-header">
                  <h3 className="card-title">{event.name}</h3>
                  <div className="card-actions">
                    {/* Botão Editar */}
                    <Link to={`/meus-eventos/editar/${event.eventId}`}>
                      <button className="icon-btn" title="Editar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                    </Link>
                    {/* Botão Deletar */}
                    <button 
                        className="icon-btn delete" 
                        title="Excluir"
                        onClick={() => handleDelete(event.eventId)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <p className="card-date">{formatDate(event.dateStart)}</p>

                <div className="card-footer">
                  {/* <Link to={`/eventos/${event.eventId}`} className="link-details">
                    Ver detalhes
                  </Link> */}
                  <span className={`status-tag ${getStatusStyle(currentStatus)}`}>
                    {currentStatus}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Paginação Simples (Visual) */}
      {/* Você pode integrar lógica real de paginação aqui baseada no retorno 'totalPages' do backend */}
      <div className="pagination-container">
        <button className="page-btn">Anterior</button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">Próximo</button>
      </div>
    </div>
  );
}

export default MyEventsPage;