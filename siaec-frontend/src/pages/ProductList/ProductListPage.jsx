import { useState, useEffect } from 'react';
import { getProducts } from '../../services/productService';
import { Link, useLocation } from 'react-router-dom';
import './ProductListPage.css';
import { Pagination } from '@mui/material';
import Carregando from '../../components/Carregando';
import SearchBar from '../../components/SearchBar';
import ProductCard from '../../components/ProductCard';

function ProductListPage() {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [searchTerm, setSearchTerm] = useState(location.state ? location.state.search : '');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts(currentPage, 9, searchTerm || null);

        setProducts(data.content || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        setError('Falha ao carregar produtos.');
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

  const handleFilterSubmit = (value) => {
    setSearchTerm(value);
    setCurrentPage(0);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-list-page">
      <h2>Catálogo de Produtos</h2>

      <SearchBar placeholder="Filtrar por nome..." onSearch={handleFilterSubmit} />

      {loading ? (
        <Carregando />
      ) : (
        <>
          <div className="product-grid">
            {products.length > 0 &&
              products.map((product) => (
                <Link to={`/products/${product.productId}`} key={product.productId} className="product-card-link">
                  <ProductCard
                    name={product.name}
                    price={product.price?.toFixed(2)}
                    imagePath={product.imagePaths ? product.imagePaths[0] : null}
                  />
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
