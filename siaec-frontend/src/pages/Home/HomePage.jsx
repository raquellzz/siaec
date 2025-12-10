import { useState, useEffect } from 'react';
import { getArtisans } from '../../services/artisanService';
import { getEvents } from '../../services/eventService';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import ArtisanCard from '../../components/ArtisanCard';
import EventCard from '../../components/EventCard';
import Carregando from '../../components/Carregando';
import SearchBar from '../../components/SearchBar';

function HomePage() {
  const [artisans, setArtisans] = useState(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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

  const onSearchProducts = (value) => {
    navigate({ pathname: '/produtos' }, { state: { search: value } });
  };

  if (loading) {
    return <Carregando />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="homepage">
      <section className="welcome-banner">
        <h1>Artesanato Potiguar: O Talento do RN na sua Casa</h1>
      </section>

      <SearchBar placeholder="Pesquise por produtos" onSearch={onSearchProducts} />

      <section className="featured-artisans">
        <div className="section-header">
          <h2>Artesões em Destaques</h2>
          {artisans.length > 0 && (
            <Link to="/artesaos" className="view-all-link">
              Ver todos
            </Link>
          )}
        </div>
        {artisans.length > 0 ? (
          <div className="artisan-list">
            {artisans.map((artisan) => (
              <Link to={`/artesaos/${artisan.artisanId}`} key={artisan.artisanId}>
                <ArtisanCard key={artisan.artisanId} name={artisan.user.name} description={artisan.description} />
              </Link>
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
            <Link to="/eventos" className="view-all-link">
              Ver todos
            </Link>
          )}
        </div>
        {events.length > 0 ? (
          <div className="event-list">
            {events.map((event) => (
              <Link to={`/eventos/${event.eventId}`} key={event.eventId}>
                <EventCard
                  key={event.eventId}
                  name={event.name}
                  local={event.location}
                  date={event.dateStart}
                  imagePath={event.imagePath}
                />
              </Link>
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
