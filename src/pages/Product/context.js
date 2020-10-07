import React, { createContext, useContext, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BasketContext from '../../context/BasketContext';

const ProductContext = createContext({
  price: 0,
  quantity: 1,
  options: [],
  required: [],
  setProduct: () => {},
  setQuantity: () => {},
  increaseOption: () => {},
  decreaseOption: () => {},
  replaceOption: () => {},
  setRequired: () => {},
  addToCart: () => {},
});

export const ProductContextProvider = ({ children }) => {
  const { increaseItem, showBasket } = useContext(BasketContext);
  const navigation = useNavigation();

  const [product, setProduct] = useState({});
  const [options, setOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [required, setRequired] = useState([]);

  const price = useMemo(() => {
    let value = product.price ?? 0; 
    if (options[0]) value += options.reduce((obj, item) => obj + item.price, 0);
    return value;
  }, [product, options]);

  const increaseOption = (arg1) => setOptions([...options, arg1]);
  const decreaseOption = (arg1) => setOptions(options.filter(item => item.name !== arg1.name));
  const replaceOption = (arg1, arg2) => setOptions([...options.filter(item => item.name !== arg1.name), arg2]);

  const addToCart = () => {
    increaseItem({
      ...product,
      quantity,
      options,
    });

    showBasket();
    navigation.goBack();
  } 

  return (
    <ProductContext.Provider
      value={{
        price,
        quantity,
        options,
        required,
        setProduct,
        setQuantity,
        increaseOption,
        decreaseOption,
        replaceOption,
        setRequired,
        addToCart,
      }}
    >
      { children }
    </ProductContext.Provider>
  )
}

export default ProductContext;
