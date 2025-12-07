import { useState, useEffect } from 'react';
import { getArtisans } from '../../services/artisanService';
import { Link } from 'react-router-dom';
import '../ProductList/ProductListPage.css';
import { Pagination } from '@mui/material';
import Carregando from '../../components/Carregando';
import SearchBar from '../../components/SearchBar';
import ArtisanCard from '../../components/ArtisanCard';

function ArtisanListPage() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
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
        console.error(err);
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

  const handleFilterSubmit = (value) => {
    setSearchTerm(value);
    setCurrentPage(0);
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-list-page">
      <h2>Nossos Artesãos</h2>
      <SearchBar placeholder="Filtrar por nome..." onSearch={handleFilterSubmit} />

      {loading ? (
        <Carregando />
      ) : (
        <>
          <div className="product-grid">
            {artisans.length > 0 &&
              artisans.map((artisan) => (
                <Link to={`/artisans/${artisan.artisanId}`} key={artisan.artisanId}>
                  <ArtisanCard description={artisan.description} name={artisan.user.name} />
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
