import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { createOrder } from '../../services/orderService';
import { useNavigate, Link } from 'react-router-dom';
import ButtonUI from '../../components/ButtonUI';
import './CartPage.css';
import { useSnackbar } from '../../hooks/useSnackbar';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Input from '../../components/Input';

function CartPage() {
  const { cartItems, changeProductQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');

  // Calcula o subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 19.9; // Hardcoded para a demo
  const total = subtotal + shippingFee;

  const handleFinalizeOrder = async () => {
    if (address.length > 0) {
      setLoading(true);

      const formattedItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const orderData = {
        paymentMethod: 'PIX', // Hardcoded para a demo
        shippingFee: shippingFee,
        items: formattedItems,
        address,
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
    } else {
      snackbar.openErrorSnackbar('Preencha o endereço de entrega.');
    }
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className="cart-container">
      <h1>Carrinho de Produtos</h1>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Seu carrinho está vazio.</p>
          <Link to="/products" className="link">
            Ver produtos
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            <div className="cart-list-grid">
              <p className="cart-list-grid-title">Produto</p>
              <p className="cart-list-grid-title">Preço</p>
              <p className="cart-list-grid-title">Quantidade</p>
              <p className="cart-list-grid-title">Total</p>
            </div>
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-list-grid">
                <p>{item.name}</p>
                <p>R$ {item.price.toFixed(2)}</p>
                <div className="quantity-actions">
                  <button onClick={() => changeProductQuantity(item.productId, -1)} className="quantity-btn">
                    <FaMinus size={10} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => changeProductQuantity(item.productId, 1)} className="quantity-btn">
                    <FaPlus size={10} />
                  </button>
                </div>
                <p>R$ {(item.quantity * item.price).toFixed(2)}</p>
              </div>
            ))}
            <div className="summary">
              <div className="summary-item">
                <p>Subtotal</p>
                <p>R$ {subtotal.toFixed(2)}</p>
              </div>
              <div className="summary-item">
                <p>Entrega</p>
                <p>R$ {shippingFee.toFixed(2)}</p>
              </div>
              <div className="summary-item">
                <p>Total</p>
                <p>R$ {total.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="address">
            <Input label="Endereço de entrega" name="address" onChange={handleChangeAddress} value={address} required />
            <div className="order-btn">
              <ButtonUI
                text={loading ? 'Processando...' : 'Finalizar compra'}
                onClick={handleFinalizeOrder}
                loading={loading}
                fullWidth
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
