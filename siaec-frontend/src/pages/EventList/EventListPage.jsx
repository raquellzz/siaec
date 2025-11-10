import { useState, useEffect } from 'react';
import { getEvents } from '../../services/eventService';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../ProductList/ProductListPage.css';
import { Pagination } from '@mui/material';

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

  const handleChange = (_, value) => {
    setCurrentPage(value);
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
      <div className="filter-container">
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
        <button type="submit" className="filter-button" onClick={handleFilterSubmit}>
          Buscar
        </button>
      </div>

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <>
          <div className="product-grid">
            {events.length > 0 &&
              events.map((event) => (
                <Link to={`/events/${event.eventId}`} key={event.eventId} className="product-card-link">
                  <div className="product-card">
                    <h3>{event.name}</h3>
                    <p>{event.location}</p>
                  </div>
                </Link>
              ))}
          </div>

          {events.length === 0 && <p>Nenhum artesão encontrado.</p>}

          {totalPages > 0 && (
            <Pagination
              count={totalPages}
              color="secondary"
              shape="rounded"
              page={currentPage + 1}
              onChange={handleChange}
            />
          )}
        </>
      )}
    </div>
  );
}
export default EventListPage;
