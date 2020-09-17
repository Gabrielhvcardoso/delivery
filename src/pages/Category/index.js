import React, { useEffect } from 'react';
import { Container } from './Container';
import { Title } from './styles';

import Product from './Product';
import { StatusBar } from 'expo-status-bar';

const Category = ({ route }) => {
  const { category } = route.params;
  
  return (
    <Container image={category.image}>
      <StatusBar style="light" />
      <Title>{ category.name }</Title>

      {
        category.products.map(product => (
          <Product key={Math.random() * Math.random()} product={product} />
        ))
      }
      <Product />
    </Container>
  );
}

export default Category;