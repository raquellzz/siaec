import { useState, useEffect } from 'react';
import { getProducts } from '../../services/productService';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './ProductListPage.css';
import { Pagination } from '@mui/material';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts(currentPage, 9, searchTerm || null);

        setProducts(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        setError('Falha ao carregar produtos. A API do backend está rodando?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm]);

  const handleChange = (_, value) => {
    setCurrentPage(value - 1);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(filter);
    setCurrentPage(0);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-list-page">
      <h2>Catálogo de Produtos</h2>

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
            {products.length > 0 &&
              products.map((product) => (
                <Link to={`/products/${product.productId}`} key={product.productId} className="product-card-link">
                  <div className="product-card">
                    {/* <img src={product.imagePaths ? product.imagePaths[0] : '/placeholder.png'} alt={product.name} /> */}
                    <h3>{product.name}</h3>
                    <p>R$ {product.price?.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
          </div>

          {products.length === 0 && <p>Nenhum produto encontrado.</p>}

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

export default ProductListPage;
