import React, { createContext, useContext, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CartContext from '../../context/CartContext';

const ProductContext = createContext({
  price: 0,
  options: [],
  setProduct: () => {},
  increaseOption: () => {},
  decreaseOption: () => {},
  addToCart: () => {},
});

export const ProductContextProvider = ({ children }) => {
  const { increaseItem } = useContext(CartContext);
  const navigation = useNavigation();

  const [product, setProduct] = useState({});
  const [options, setOptions] = useState([]);

  const price = useMemo(() => {
    let value = product.price ?? 0; 
    if (options[0]) value += options.reduce((obj, item) => obj + item.price, 0);
    return value;
  }, [product, options]);

  const increaseOption = (arg1) => setOptions([...options, arg1]);
  const decreaseOption = (arg1) => setOptions(options.filter(item => item.name !== arg1.name));

  const addToCart = () => {
    increaseItem({
      ...product,
      options,
    });

    navigation.popToTop();
  } 

  return (
    <ProductContext.Provider
      value={{
        price,
        options,
        setProduct,
        increaseOption,
        decreaseOption,
        addToCart,
      }}
    >
      { children }
    </ProductContext.Provider>
  )
}

export default ProductContext;
