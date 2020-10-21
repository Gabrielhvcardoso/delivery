import React, { useContext } from 'react';
import { Container } from './Container';
import { Title } from './styles';

import Product from './Product';
import { StatusBar } from 'expo-status-bar';

import ThemeContext from '../../context/ThemeContext';

const Category = ({ route }) => {
  const { background, main, muted, soft, surface, text } = useContext(ThemeContext);
  const { category } = route.params;
  
  return (
    <Container image={category.image}>
      <StatusBar style="light" />
      <Title style={{ color: text }}>{ category.name }</Title>

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