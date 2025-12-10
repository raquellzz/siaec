import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavoriteEvents, toggleFavoriteEvent } from '../../services/eventService';
import Header from '../../components/Header/Header'; 
import '../MyEvents/MyEventsPage.css'; 

function FavoriteEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('Todos');

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getFavoriteEvents();
      setEvents(data.content || []); 
      setError(null);
    } catch (err) {
      setError('Falha ao carregar eventos favoritos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleUnfavorite = async (eventId) => {
    if (window.confirm('Remover este evento dos seus favoritos?')) {
      try {
        await toggleFavoriteEvent(eventId);
        setEvents((prevEvents) => prevEvents.filter(e => e.eventId !== eventId));
      } catch (err) {
        alert('Erro ao remover favorito: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const getStatus = (event) => {
    if (event.status === 'Cancelado') return 'Cancelado';
    if (event.status) return event.status;

    const now = new Date();
    const start = new Date(event.dateStart);
    const end = new Date(event.dateEnd);

    if (end < now) return 'Concluído';
    if (start > now) return 'Próximo';
    return 'Ativo';
  };

  const getStatusStyle = (statusLabel) => {
    switch (statusLabel) {
      case 'Ativo': return 'status-ativo';
      case 'Próximo': return 'status-proximo';
      case 'Concluído': return 'status-concluido';
      case 'Cancelado': return 'status-cancelado';
      default: return 'status-ativo';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getFilteredEvents = () => {
    if (filter === 'Todos') return events;
    return events.filter((event) => getStatus(event) === filter);
  };

  const tabs = ['Todos', 'Próximo', 'Concluído', 'Cancelado'];

  if (loading) return <div className="my-events-container">Carregando favoritos...</div>;
  if (error) return <div className="my-events-container" style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="manage-users-page"> 
      <Header />
      
      <div className="my-events-container">
        
        <div style={{ marginBottom: '20px' }}>
        </div>

        <div className="header-section">
          <h2 className="page-title">Meus Eventos Salvos</h2>
        </div>

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

        <div className="event-cards-grid">
          {getFilteredEvents().length === 0 ? (
            <div className="no-events">
              <p>Você não tem eventos favoritados nesta categoria.</p>
            </div>
          ) : (
            getFilteredEvents().map((event) => {
              const currentStatus = getStatus(event);

              return (
                <div key={event.eventId} className="event-card">
                  <div className="card-header">
                    <h3 className="card-title">{event.name}</h3>
                    
                    <div className="card-actions">
                      <button 
                        className="icon-btn favorite-btn" 
                        title="Remover dos Favoritos" 
                        onClick={() => handleUnfavorite(event.eventId)}
                        style={{ color: '#d32f2f' }} 
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <p className="card-date">{formatDate(event.dateStart)}</p>

                  <div className="card-footer">
                    <Link to={`/events/${event.eventId}`} className="link-details">
                      Ver detalhes
                    </Link>
                    <span className={`status-tag ${getStatusStyle(currentStatus)}`}>
                      {currentStatus}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoriteEventsPage;