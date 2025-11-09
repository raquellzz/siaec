import React, { useState, useEffect } from 'react';
import { getArtisans } from '../services/artisanService';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './ProductListPage.css'; // REUTILIZANDO O CSS de produtos

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

  const handleNextPage = () => { /* ... (igual ProductList) ... */ if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1); };
  const handlePrevPage = () => { /* ... (igual ProductList) ... */ if (currentPage > 0) setCurrentPage(currentPage - 1); };
  const handleFilterSubmit = (e) => { e.preventDefault(); setSearchTerm(filter); setCurrentPage(0); };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="product-list-page">
      <h2>Nossos Artesãos</h2>
      <form className="filter-container" onSubmit={handleFilterSubmit}>
        {/* ... (input e botão de filtro iguais ao ProductList) ... */}
         <div className="search-bar-wrapper">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Filtrar por nome..." value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-input" />
        </div>
        <button type="submit" className="filter-button">Buscar</button>
      </form>

      {loading ? ( <div className="loading">Carregando...</div> ) : (
        <>
          <div className="product-grid">
            {artisans.length > 0 ? (
              artisans.map((artisan) => (
                <Link to={`/artisans/${artisan.artisanId}`} key={artisan.artisanId} className="product-card-link">
                  <div className="product-card">
                    {/* (Adicionar imagem do artesão aqui quando tiver) */}
                    <h3>{artisan.user.name}</h3> {/* Nome vem do User aninhado */}
                    <p>{artisan.description}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p>Nenhum artesão encontrado.</p>
            )}
          </div>
          <div className="pagination-controls">
            {/* ... (botões de paginação iguais ao ProductList) ... */}
            <button onClick={handlePrevPage} disabled={currentPage === 0}>Anterior</button>
            <span>Página {currentPage + 1} de {totalPages || 1}</span>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>Próxima</button>
          </div>
        </>
      )}
    </div>
  );
}
export default ArtisanListPage;