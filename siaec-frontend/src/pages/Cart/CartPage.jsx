import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { createOrder } from '../../services/orderService';
import { useNavigate, Link } from 'react-router-dom';
import ButtonUI from '../../components/ButtonUI';
import './CartPage.css';
import { useSnackbar } from '../../hooks/useSnackbar';

function CartPage() {
  const { cartItems, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  // Calcula o subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 0; // Hardcoded para a demo
  const total = subtotal + shippingFee;

  const handleFinalizeOrder = async () => {
    setLoading(true);

    const formattedItems = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const orderData = {
      paymentMethod: 'PIX', // Hardcoded para a demo
      shippingFee: shippingFee,
      items: formattedItems,
    };

    try {
      await createOrder(orderData);
      snackbar.openSuccessSnackbar('Pedido realizado com sucesso!');
      clearCart();
      navigate('/');
    } catch (err) {
      snackbar.openErrorSnackbar(err.response?.data?.message || 'Falha ao finalizar o pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-container">
      <h1>Meu Carrinho</h1>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Seu carrinho está vazio.</p>
          <Link to="/products">Ver produtos</Link>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>
                    Qtd: {item.quantity} x R$ {item.price.toFixed(2)}
                  </p>
                </div>
                <div className="cart-item-actions">
                  <p>R$ {(item.quantity * item.price).toFixed(2)}</p>
                  <button onClick={() => removeItem(item.productId)} className="remove-btn">
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Resumo do Pedido</h2>
            <p>
              <span>Subtotal:</span> <span>R$ {subtotal.toFixed(2)}</span>
            </p>
            <p>
              <span>Frete:</span> <span>R$ {shippingFee.toFixed(2)}</span>
            </p>
            <p className="total">
              <span>Total:</span> <span>R$ {total.toFixed(2)}</span>
            </p>
            <ButtonUI
              text={loading ? 'Processando...' : 'Finalizar Pedido'}
              onClick={handleFinalizeOrder}
              loading={loading}
              fullWidth
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
