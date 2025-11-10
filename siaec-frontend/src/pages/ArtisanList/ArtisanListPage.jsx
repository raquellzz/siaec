import { useState, useEffect } from 'react';
import { getArtisans } from '../../services/artisanService';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../ProductList/ProductListPage.css';
import { Pagination } from '@mui/material';

function ArtisanListPage() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getArtisans(currentPage, 9, searchTerm || null);
        setArtisans(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        setError('Falha ao carregar artesãos.');
      } finally {
        setLoading(false);
      }
    };
    fetchArtisans();
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
      <h2>Nossos Artesãos</h2>
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
            {artisans.length > 0 &&
              artisans.map((artisan) => (
                <Link to={`/artisans/${artisan.artisanId}`} key={artisan.artisanId} className="product-card-link">
                  <div className="product-card">
                    <h3>{artisan.user.name}</h3>
                    <p>{artisan.description}</p>
                  </div>
                </Link>
              ))}
          </div>

          {artisans.length === 0 && <p>Nenhum artesão encontrado.</p>}

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
export default ArtisanListPage;
