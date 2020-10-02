import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Container, CategoryScrollView } from './styles';
import { FAB } from 'react-native-paper';

import BasketContext from '../../context/BasketContext';

import { useFetch } from '../../hooks/useFetch';
import { useToken } from '../../hooks/useToken';
import { RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const { showBasket, products } = useContext(BasketContext);

  const [isRefresh, setIsRefresh] = useState(false);

  const getProducts = (onEnd = () => {}) => {
    useFetch.get('/p/all/' + useToken(), (response) => {
      setCategories(response.categories);
      onEnd();
    });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {
        products[0] ? (
          <FAB
            style={{ position: 'absolute', bottom: 90, right: 20, zIndex: 1 }}
            onPress={() => showBasket()}
            icon={() => <Icon name="shopping-bag" type="feather" color="white" />}
            label="Ver pedido"
          />
        ) : <></>
      }
      
      <Container
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={() => {
            setIsRefresh(true);
            getProducts(() => {
              setIsRefresh(false);
            });
          }} />
        }
      >
        <StatusBar style="dark" />
        <CategoryScrollView categories={categories} />
      </Container>
    </>
  );
}

export default Home;