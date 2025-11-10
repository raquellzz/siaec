import { useState, useEffect } from 'react';
import { getArtisans } from '../../services/artisanService';
import { getEvents } from '../../services/eventService';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HomePage.css';

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

  // Filtra artesãos
  const filteredArtisans = artisans.filter((artisan) => artisan.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  // Filtra feiras
  const filteredFairs = events.filter((event) => event.name.toLowerCase().includes(searchTerm.toLowerCase())) || [];

  return (
    <div className="homepage">
      <section className="welcome-banner">
        <h1>Artesanato Potiguar: O Talento do RN na sua Casa</h1>
      </section>

      <div className="search-bar-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Pesquise aqui por produtos, artesãos ou eventos"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/products" className="catalog-button ease-in delay-50">
          Pesquisar
        </Link>
      </div>

      <section className="featured-artisans mt-3">
        <div className="section-header">
          <h2>Artesões em Destaques</h2>
          <Link to="/artisans" className="view-all-link">
            Ver todos
          </Link>
        </div>
        {filteredArtisans.length > 0 ? (
          <div className="artisan-list">
            {filteredArtisans.map((artisan, index) => (
              <div key={index} className="artisan-card">
                <p>{artisan}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>{searchTerm ? 'Nenhum artesão encontrado.' : 'Nenhum artesão em destaque no momento.'}</p>
        )}
      </section>

      <section className="upcoming-fairs">
        <div className="section-header">
          <h2>Próximos Eventos</h2>
          <Link to="/events" className="view-all-link">
            Ver todos
          </Link>
        </div>
        {filteredFairs.length > 0 ? (
          <div className="fair-list">
            {filteredFairs.map((event, index) => (
              <div key={index} className="fair-card">
                <p>{event.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>{searchTerm ? 'Nenhum evento encontrado.' : 'Nenhum evento cadastrado no momento.'}</p>
        )}
      </section>
    </div>
  );
}

export default HomePage;
