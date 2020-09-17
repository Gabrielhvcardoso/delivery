import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import Container from './Container';
import Options from './Options';

import { Title, Subtitle } from './styles';

const Product = ({ route }) => {
  const { product } = route.params;

  return (
    <Container image={product.image} favorite={product.favorite}>
      <StatusBar style="light" />
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Button
          style={{ marginRight: 5, flex: 1 }}
          mode="outlined"
          icon="cart-outline"
        >
          carrinho
        </Button>
        <Button
          style={{ marginLeft: 5, flex: 1 }}
          mode={product.favorite ? "contained" : "outlined"}
          icon={product.favorite ? "heart" : "heart-outline"}
        >
          favoritos
        </Button>
      </View>
      

      <Title numberOfLines={2}>
        { product.name }
      </Title>
      <Subtitle>
        { product.details }
      </Subtitle>

      {
        product.options ? (
          <Options options={product.options} />
        ) : <></>
      }

      <View style={{ paddingHorizontal: 10, paddingTop: 20, marginTop: 10, borderTopWidth: 0.3, borderTopColor: '#aaa'  }}>
        <Title>
          Valor final: R$ 67,90
        </Title>
      </View>

      <Button
        style={{ marginTop: 20, elevation: 0, paddingVertical: 10 }}
        mode="contained"
        icon="cart"
      >
        Adicionar ao carrinho
      </Button>
    </Container>
  );
}

export default Product;