import React from 'react';
import { Container, CategoryScrollView } from './styles';

import data from '../../data';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
  return (
    <Container>
      <StatusBar style="dark" />
      <CategoryScrollView categories={data.categories} />
    </Container>
  );
}

export default Home;