import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import { useCart } from '../../contexts/CartContext';
import ButtonUI from '../../components/ButtonUI';
import Input from '../../components/Input';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setLoading(true);
    getProductById(productId)
      .then(setProduct)
      .catch((err) => setError('Produto não encontrado.'))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleAddToCart = () => {
    if (product && quantity > 0) {
      addItem(product, parseInt(quantity, 10));
      setFeedback('Produto adicionado ao carrinho!');
    }
  };

  if (loading) return <div className="detail-container">Carregando produto...</div>;
  if (error) return <div className="detail-container error">{error}</div>;
  if (!product) return null;

  return (
    <div className="detail-container">
      <h1>{product.name}</h1>
      {product.imagePaths && product.imagePaths.length > 0 && (
        <img src={product.imagePaths[0]} alt={product.name} className="detail-image" />
      )}
      <p className="detail-price">R$ {product.price?.toFixed(2)}</p>
      <p className="detail-description">{product.description}</p>
      <p>
        <strong>Estoque:</strong> {product.stock}
      </p>
      <p>
        <strong>Material:</strong> {product.material}
      </p>

      <div className="detail-actions">
        <Input
          label="Quantidade"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          max={product.stock}
        />
        <ButtonUI text="Adicionar ao Carrinho" onClick={handleAddToCart} disabled={product.stock === 0} />
      </div>
      {feedback && <p className="feedback">{feedback}</p>}
      {product.stock === 0 && <p className="error">Produto indisponível no momento.</p>}
    </div>
  );
}

export default ProductDetailPage;