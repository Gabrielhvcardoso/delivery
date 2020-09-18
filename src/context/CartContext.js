import React, { createContext, useState } from 'react';

const CartContext = createContext({
  products: [],
  increaseItem: () => {},
  decreaseItem: () => {}
});

export const CartContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const increaseItem = (item) => {
    setProducts([...products, {...item, id: Math.random() * Math.random() }]);
  }

  const decreaseItem = (id) => {
    let array = products.filter(item => item.id !== id);
    setProducts(array);
  }

  return (
    <CartContext.Provider value={{ products, increaseItem, decreaseItem }}>
      { children }
    </CartContext.Provider>
  );
}

export default CartContext;
