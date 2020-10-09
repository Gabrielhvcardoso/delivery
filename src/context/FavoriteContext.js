import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const FavoriteContext = createContext({
  products: [],
  addFavorite: (productId) => {},
  removeFavorite: (productId) => {},
  verifyFavorite: (productId) => {},
});

export const FavoriteContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  console.log(products)

  useEffect(() => {
    const getItems = async () => {
      const favoritos = await AsyncStorage.getItem("favoritos");
      if (favoritos) {
        setProducts(JSON.parse(favoritos));
      }
    }
    getItems();
  }, []);

  const updateFavorites = async (newOne) => {
    setProducts(newOne);
    await AsyncStorage.setItem("favoritos", JSON.stringify(newOne));
  }

  const addFavorite = (productId) => {
    if (products) {
      const newProducts = [...products, productId];
      updateFavorites(newProducts);
    } else {
      updateFavorites([ productId ]);
    }
  }

  const removeFavorite = async (productId) => {
    const newProducts = products.filter(item => item !== productId);
    updateFavorites(newProducts);
  }

  const verifyFavorite = (productId) => {
    return products ? products.some(item => item === productId) : false;
  }

  return (
    <FavoriteContext.Provider value={{ products, addFavorite, removeFavorite, verifyFavorite }}>
      { children }
    </FavoriteContext.Provider>
  );
}

export default FavoriteContext;
