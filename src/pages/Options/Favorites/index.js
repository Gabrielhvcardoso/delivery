import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { useFetch } from '../../../hooks/useFetch';
import { useToken } from '../../../hooks/useToken';

import FavoriteContext from '../../../context/FavoriteContext';
import Product from '../../Category/Product';

import ThemeContext from '../../../context/ThemeContext';

const Favorites = ({ navigation }) => {
  const { background } = useContext(ThemeContext);

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
  });

  if (!products[0]) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{ fontFamily: 'Inter Regular', maxWidth: '70%', textAlign: 'center' }}
        >Quando você favoritar algum produto, ele aparecerá aqui.</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={products}
      style={{ flex: 1, backgroundColor: background }}
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