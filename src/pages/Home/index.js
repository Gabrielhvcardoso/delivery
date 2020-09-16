import React from 'react';
import { View } from 'react-native';

import HorizontalList from '../../components/HorinzontalList';

const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HorizontalList size="md" />
    </View>
  );
}

export default Home;