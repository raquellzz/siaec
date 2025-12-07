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

  const removeItem = (productId) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.productId !== productId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
