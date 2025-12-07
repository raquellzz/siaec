import { useState, useEffect } from 'react';
import { getArtisans } from '../../services/artisanService';
import { getEvents } from '../../services/eventService';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HomePage.css';
import ArtisanCard from '../../components/ArtisanCard';
import EventCard from '../../components/EventCard';

function HomePage() {
  const [artisans, setArtisans] = useState(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const pageSize = 4;

        const [artisanData, eventData] = await Promise.all([
          getArtisans(0, pageSize, null),
          getEvents(0, pageSize, null),
        ]);

        setArtisans(artisanData.content || []);
        setEvents(eventData.content || []);
      } catch (err) {
        setError('Falha ao carregar os dados da página inicial.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="homepage">
      <section className="welcome-banner">
        <h1>Artesanato Potiguar: O Talento do RN na sua Casa</h1>
      </section>

      <div className="search-bar-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Pesquise por produtos"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/products" className="catalog-button">
          Pesquisar
        </Link>
      </div>

      <section className="featured-artisans">
        <div className="section-header">
          <h2>Artesões em Destaques</h2>
          {artisans.length > 0 && (
            <Link to="/artisans" className="view-all-link">
              Ver todos
            </Link>
          )}
        </div>
        {artisans.length > 0 ? (
          <div className="artisan-list">
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.artisanId} name={artisan.user.name} description={artisan.description} />
            ))}
          </div>
        ) : (
          <p>Nenhum artesão em destaque no momento.</p>
        )}
      </section>

      <section className="upcoming-fairs">
        <div className="section-header">
          <h2>Próximos Eventos</h2>
          {events.length > 0 && (
            <Link to="/events" className="view-all-link">
              Ver todos
            </Link>
          )}
        </div>
        {events.length > 0 ? (
          <div className="event-list">
            {events.map((event) => (
              <EventCard key={event.eventId} name={event.name} local={event.location} date={event.dateStart} />
            ))}
          </div>
        ) : (
          <p>Nenhum evento cadastrado no momento.</p>
        )}
      </section>
    </div>
  );
}

export default HomePage;
