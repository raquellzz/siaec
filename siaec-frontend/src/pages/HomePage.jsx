import React, { useState, useEffect } from 'react';
import { getHomeData } from '../services/homeService'; 
import { FaSearch } from 'react-icons/fa';
import './HomePage.css';

function HomePage() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getHomeData(); 
        setHomeData(data); 
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

  if (!homeData) {
      return <div className="error-message">Não foi possível carregar os dados.</div>;
  }

  // Filtra artesãos
  const filteredArtisans = homeData.artesoesDestaque?.filter(artesao =>
    artesao.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Filtra feiras
  const filteredFairs = homeData.proximasFeiras?.filter(feira =>
    feira.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];


  return (
    <div className="homepage">
      <section className="welcome-banner">
        <h1>{homeData.mensagemBoasVindas || 'Bem-vindo ao SIAEC!'}</h1>
      </section>

      <div className="search-bar-container">
          <FaSearch className="search-icon" /> 
          <input 
            type="text" 
            placeholder="Pesquise aqui por produtos, artesãos ou eventos..." 
            className="search-input"
            value={searchTerm} // Controla o valor
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado
          />
      </div>

      <section className="featured-artisans">
        <h2>Artesãos em Destaque</h2>
        {filteredArtisans.length > 0 ? (
          <div className="artisan-list">
            {filteredArtisans.map((artesao, index) => (
              <div key={index} className="artisan-card">
                <p>{artesao}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>{searchTerm ? 'Nenhum artesão encontrado.' : 'Nenhum artesão em destaque no momento.'}</p>
        )}
      </section>

      <section className="upcoming-fairs">
        <h2>Próximas Feiras</h2>
        {filteredFairs.length > 0 ? (
          <div className="fair-list">
            {filteredFairs.map((feira, index) => (
              <div key={index} className="fair-card">
                <p>{feira}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>{searchTerm ? 'Nenhuma feira encontrada.' : 'Nenhuma feira cadastrada no momento.'}</p>
        )}
      </section>
    </div>
  );
}

export default HomePage;