import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (product, quantityToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === product.productId);

      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product.productId ? { ...item, quantity: item.quantity + quantityToAdd } : item,
        );
      } else {
        return [...prevItems, { ...product, quantity: quantityToAdd }];
      }
    });
  };

  const changeProductQuantity = (productId, increment) => {
    const cartTemporary = cartItems.map((item) => {
      if (item.productId === productId) {
        const quantity = item.quantity + increment;
        if (quantity > 0) return { ...item, quantity: item.quantity + increment };
        else return undefined;
      } else {
        return item;
      }
    });
    setCartItems(cartTemporary.filter((item) => item !== undefined));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addItem,
    changeProductQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
