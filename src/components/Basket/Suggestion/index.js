import React, { useContext } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';

import * as RootNavigation from '../../../RootNavigation';
import BasketContext from '../../../context/BasketContext';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const Suggestion = ({ array, style }) => {
  const { dismissBasket } = useContext(BasketContext);
  return (
    <ScrollView
      horizontal
      style={style}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      {
        shuffle(array).slice(0, 10).map(product => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              dismissBasket();
              RootNavigation.navigate('Product', { product });
            }}
          >
            <Image
              key={Math.random() * Math.random()}
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