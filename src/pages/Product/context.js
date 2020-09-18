import React, { createContext, useState } from 'react';

const ProductContext = createContext({
  price: 0,
  increasePrice: () => {},
  decreasePrice: () => {}
});

export const ProductContextProvider = ({ children }) => {
  const [price, setPrice] = useState(0);

  const increasePrice = (arg1, onEnd = () => {}) => {
    setPrice(price + arg1);
    onEnd();
  };

  const decreasePrice = (arg1, onEnd = () => {}) => {
    setPrice(price - arg1);
    onEnd();
  };

  return (
    <ProductContext.Provider value={{
      price,
      increasePrice,
      decreasePrice,
    }}>
      { children }
    </ProductContext.Provider>
  )
}

export default ProductContext;
