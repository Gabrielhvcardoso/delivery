import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';

import * as RootNavigation from '../../../RootNavigation';
import BasketContext from '../../../context/BasketContext';

import { useFetch } from '../../../hooks/useFetch';
import { useToken } from '../../../hooks/useToken';

import { useShuffle } from '../../../hooks/useShuffle';

const Suggestion = ({ style }) => {
  const { dismissBasket } = useContext(BasketContext);
  const [array, setArray] = useState([]);

  useEffect(() => {
    useFetch.get('/p/all/' + useToken(), (response) => {
      setArray(response.categories.flatMap(item => item.products));
    });
  }, []);
  
  return (
    <ScrollView
      horizontal
      style={style}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      {
        useShuffle(array).slice(0, 10).map(product => (
          <TouchableOpacity
            key={Math.random() * Math.random()}
            activeOpacity={0.8}
            onPress={() => {
              dismissBasket();
              RootNavigation.navigate('Product', { product });
            }}
          >
            <Image
              style={{
                borderRadius: 10,
                margin: 5,
                width: 120,
                height: 120,
              }}
              source={{ uri: product.image }}
            />
          </TouchableOpacity>
        ))
      }
    </ScrollView>
  );
}

export default Suggestion;