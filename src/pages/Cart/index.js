import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { Container } from './styles';

import Section from './Section';
import CartContext from '../../context/CartContext';

const Cart = () => {
  const { products } = useContext(CartContext);

  console.log(products)

  if (!products[0]) {
    return (
      <Container>
        <Text
          style={{
            alignSelf: 'center',
            color: '#aaa',
            fontSize: 18,
            marginTop: 200,
          }}
        >Ainda não há nada aqui</Text>
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar style="dark" />
      {
        products.map((product) => {
          return (
            <Section product={product} key={Math.random() * Math.random()} />
          );
        })
      }
    </Container>
  );
}

export default Cart;