import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import { useCart } from '../../hooks/useCart';
import ButtonUI from '../../components/ButtonUI';
import Carregando from '../../components/Carregando';
import defaultImage from '../../assets/product-placeholder.png';
import { useSnackbar } from '../../hooks/useSnackbar';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { productId } = useParams();
  const { addItem } = useCart();
  const snackbar = useSnackbar();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProductById(productId)
      .then(setProduct)
      .catch(() => setError('Produto não encontrado.'))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1);
      snackbar.openSuccessSnackbar('Produto adicionado ao carrinho!');
    }
  };

  if (loading) return <Carregando />;
  if (error) return <div className="detail-container error">{error}</div>;
  if (!product) return null;

  return (
    <div className="detail-container">
      {product.imagePaths && product.imagePaths.length < 4 && (
        <div className="images">
          {product.imagePaths[0] && <img src={product.imagePaths[0]} className="detail-image" />}
          {product.imagePaths[1] && <img src={product.imagePaths[1]} className="detail-image" />}
          {product.imagePaths[2] && <img src={product.imagePaths[2]} className="detail-image" />}
          {product.imagePaths[3] && <img src={product.imagePaths[3]} className="detail-image" />}
        </div>
      )}
      {product.imagePaths && product.imagePaths.length > 4 && (
        <div className="images-grid">
          <img src={product.imagePaths[0] || defaultImage} className="detail-image" />
          <img src={product.imagePaths[1] || defaultImage} className="detail-image" />
          <div className="image-col">
            <img src={product.imagePaths[2] || defaultImage} className="detail-image" />
            <img src={product.imagePaths[3] || defaultImage} className="detail-image" />
          </div>
          <div className="image-col">
            <img src={product.imagePaths[4] || defaultImage} className="detail-image" />
            <img src={product.imagePaths[5] || defaultImage} className="detail-image" />
          </div>
        </div>
      )}
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="detail-artisan">De {product.artisanName}</p>
        <p className="detail-description">{product.description}</p>
        <p className="detail-stock-material">
          <strong>Estoque:</strong> {product.stock}
        </p>
        <p className="detail-stock-material">
          <strong>Material:</strong> {product.material}
        </p>
        {product.stock === 0 && <p className="error">Produto indisponível no momento.</p>}
        <p className="detail-price">R$ {product.price?.toFixed(2)}</p>
      </div>
      <div className="detail-actions">
        <ButtonUI text="Adicionar ao Carrinho" onClick={handleAddToCart} disabled={product.stock === 0} />
      </div>
    </div>
  );
}

export default ProductDetailPage;
