import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Container, CategoryScrollView } from './styles';
import { FAB } from 'react-native-paper';

import BasketContext from '../../context/BasketContext';

import { useFetch } from '../../hooks/useFetch';
import { useToken } from '../../hooks/useToken';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const { showBasket } = useContext(BasketContext);

  useEffect(() => {
    useFetch.get('/p/all/' + useToken(), (response) => {
      setCategories(response.categories);
    });
  }, []);

  return (
    <>
      <FAB
        style={{ position: 'absolute', bottom: 30, right: 20, zIndex: 1 }}
        onPress={() => showBasket()}
        icon="basket"
      />
      <Container>
        <StatusBar style="dark" />
        <CategoryScrollView categories={categories} />
      </Container>
    </>
  );
}

export default Home;