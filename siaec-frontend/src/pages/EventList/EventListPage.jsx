import { useState, useEffect } from 'react';
import { getEvents } from '../../services/eventService';
import { Link } from 'react-router-dom';
import '../ProductList/ProductListPage.css';
import { Pagination } from '@mui/material';
import Carregando from '../../components/Carregando';
import SearchBar from '../../components/SearchBar';
import EventCard from '../../components/EventCard';

function EventListPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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
        console.error(err);
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

  const handleFilterSubmit = (value) => {
    setSearchTerm(value);
    setCurrentPage(0);
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-list-page">
      <h2>Próximos Eventos</h2>

      <SearchBar placeholder="Filtrar por nome..." onSearch={handleFilterSubmit} />

      {loading ? (
        <Carregando />
      ) : (
        <>
          <div className="product-grid">
            {events.length > 0 &&
              events.map((event) => (
                <Link to={`/events/${event.eventId}`} key={event.eventId}>
                  <EventCard
                    name={event.name}
                    local={event.location}
                    date={event.dateStart}
                    imagePath={event.imagePath}
                  />
                </Link>
              ))}
          </div>

          {events.length === 0 && <p>Nenhum evento encontrado.</p>}

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
