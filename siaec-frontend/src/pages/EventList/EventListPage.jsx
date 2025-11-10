import { useState, useEffect } from 'react';
import { getEvents } from '../../services/eventService';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../ProductList/ProductListPage.css';

function EventListPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getEvents(currentPage, 9, searchTerm || null);
        setEvents(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        setError('Falha ao carregar eventos.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [currentPage, searchTerm]);

  const handleNextPage = () => {
    /* ... (igual ProductList) ... */ if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    /* ... (igual ProductList) ... */ if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(filter);
    setCurrentPage(0);
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-list-page">
      <h2>Próximos Eventos</h2>
      <form className="filter-container" onSubmit={handleFilterSubmit}>
        {/* ... (input e botão de filtro iguais ao ProductList) ... */}
        <div className="search-bar-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Filtrar por nome..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-input"
          />
        </div>
        <button type="submit" className="filter-button">
          Buscar
        </button>
      </form>

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <>
          <div className="product-grid">
            {events.length > 0 ? (
              events.map((event) => (
                <Link to={`/events/${event.eventId}`} key={event.eventId} className="product-card-link">
                  <div className="product-card">
                    <h3>{event.name}</h3>
                    <p>{event.location}</p>
                    {/* (Adicionar datas do evento) */}
                  </div>
                </Link>
              ))
            ) : (
              <p>Nenhum evento encontrado.</p>
            )}
          </div>
          <div className="pagination-controls">
            {/* ... (botões de paginação iguais ao ProductList) ... */}
            <button onClick={handlePrevPage} disabled={currentPage === 0}>
              Anterior
            </button>
            <span>
              Página {currentPage + 1} de {totalPages || 1}
            </span>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default EventListPage;
