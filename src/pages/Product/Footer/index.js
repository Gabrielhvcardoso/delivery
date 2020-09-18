import React, { useContext, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';

import { Title } from '../styles';

import ProductContext from '../context';

const Footer = ({ initialPrice }) => {
  const { price, increasePrice } = useContext(ProductContext);

  useEffect(() => {
    increasePrice(initialPrice);
  }, [])

  return (
    <View>
      <View style={{ paddingHorizontal: 10, paddingTop: 20, marginTop: 10, borderTopWidth: 0.3, borderTopColor: '#aaa'  }}>
        <Title>
          Valor final: R$ { price.toFixed(2).toString().replace('.', ',') }
        </Title>
      </View>

      <Button
        style={{ marginTop: 20, elevation: 0, paddingVertical: 10 }}
        mode="contained"
        icon="cart"
      >
        Adicionar ao carrinho
      </Button>
    </View>
  );
}

export default Footer;