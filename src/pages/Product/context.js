import React, { createContext, useContext, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BasketContext from '../../context/BasketContext';

const ProductContext = createContext({
  price: 0,
  quantity: 1,
  options: [],
  setProduct: () => {},
  setQuantity: () => {},
  increaseOption: () => {},
  decreaseOption: () => {},
  addToCart: () => {},
});

export const ProductContextProvider = ({ children }) => {
  const { increaseItem } = useContext(BasketContext);
  const navigation = useNavigation();

  const [product, setProduct] = useState({});
  const [options, setOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);

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
      quantity,
      options,
    });

    navigation.popToTop();
  } 

  return (
    <ProductContext.Provider
      value={{
        price,
        quantity,
        options,
        setProduct,
        setQuantity,
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
