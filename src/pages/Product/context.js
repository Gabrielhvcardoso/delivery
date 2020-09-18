import React, { createContext, useEffect, useMemo, useState } from 'react';

const ProductContext = createContext({
  price: 0,
  options: [],
  setInitialPrice: () => {},
  increaseOption: () => {},
  decreaseOption: () => {}
});

export const ProductContextProvider = ({ children }) => {
  const [initialPrice, setInitialPrice] = useState(0);
  const [options, setOptions] = useState([]);

  const price = useMemo(() => {
    let value = initialPrice
    
    if (options[0]) {
      value += options.reduce((obj, item) => obj + item.price, 0);
    }

    return value;
  }, [initialPrice, options]);

  const increaseOption = (arg1) => {
    setOptions([...options, arg1]);

    console.log(options)
  };

  const decreaseOption = (arg1) => {
    let array = options.filter(item => item.name !== arg1.name);
    setOptions(array);
  };

  return (
    <ProductContext.Provider value={{
      price,
      options,
      setInitialPrice,
      increaseOption,
      decreaseOption,
    }}>
      { children }
    </ProductContext.Provider>
  )
}

export default ProductContext;
