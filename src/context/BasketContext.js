import React, { createContext, useState } from 'react';

const BasketContext = createContext({
  products: [],
  increaseItem: () => {},
  decreaseItem: () => {},

  // basket modal
  isBasketVisible: false,
  showBasket: () => {},
  dismissBasket: () => {}
});

export const BasketContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isBasketVisible, setIsBasketVisible] = useState(false);

  const showBasket = () => setIsBasketVisible(true);
  const dismissBasket = () => setIsBasketVisible(false);

  const increaseItem = (item) => {
    setProducts([...products, {...item, id: Math.random() * Math.random() }]);
  }

  const decreaseItem = (id) => {
    let array = products.filter(item => item.id !== id);
    setProducts(array);
  }

  return (
    <BasketContext.Provider value={{
      products,
      increaseItem,
      decreaseItem,
      isBasketVisible,
      showBasket,
      dismissBasket,
    }}>
      { children }
    </BasketContext.Provider>
  );
}

export default BasketContext;
