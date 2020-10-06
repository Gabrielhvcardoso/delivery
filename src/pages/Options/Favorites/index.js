import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';

import { useFetch } from '../../../hooks/useFetch';
import { useToken } from '../../../hooks/useToken';

import FavoriteContext from '../../../context/FavoriteContext';
import Product from '../../Category/Product';

const Favorites = ({ navigation }) => {
  const { verifyFavorite } = useContext(FavoriteContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    useFetch.get('/p/all/' + useToken(), (response) => {

      const reduce = response.categories.reduce((obj, item) => {
        const { products } = item;
        for (let counter = 0; counter < products.length; counter++) {
          if (verifyFavorite(products[counter].productId)) {
            obj.push(products[counter]);
          }
        }
        return obj;
      }, []);

      setProducts(reduce)
    });
  }, []);
    
  return (
    <FlatList
      data={products}
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{ padding: 15 }}
      keyExtractor={item => item.productId.toString()}
      renderItem={({ item }) => {
        return (
          <Product key={Math.random() * Math.random()} product={item} />
        )
      }}
    />
  );
}

export default Favorites;