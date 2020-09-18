import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Container, CategoryScrollView } from './styles';
import { FAB } from 'react-native-paper';

import BasketContext from '../../context/BasketContext';

import data from '../../data';

const Home = () => {
  const { showBasket } = useContext(BasketContext);

  return (
    <>
      <FAB
        style={{ position: 'absolute', bottom: 30, right: 20, zIndex: 1 }}
        onPress={() => showBasket()}
        icon="basket"
      />
      <Container>
        <StatusBar style="dark" />
        <CategoryScrollView categories={data.categories} />
      </Container>
    </>
  );
}

export default Home;