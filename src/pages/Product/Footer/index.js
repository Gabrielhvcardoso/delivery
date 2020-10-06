import React, { useContext, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import styled from 'styled-components';
import { Title } from '../styles';

import ProductContext from '../context';

const Text = styled.Text`
  font-family: Inter Regular;
`;

const Footer = ({ product }) => {
  const { price, options, setProduct, addToCart } = useContext(ProductContext);

  useEffect(() => setProduct({
    productId: product.productId,
    name: product.name,
    price: product.saleStatus ? product.salePrice : product.price,
    image: product.image
  }), []);

  return (
    <View>
      <View style={{
        paddingHorizontal: 10,
        paddingTop: 40,
        marginTop: 30,
        borderTopWidth: 0.3,
        borderTopColor: '#aaa',
      }}>
        {
          options[0] ? (
            <View
              key={Math.random()}
              style={{ flexDirection: 'row', justifyContent: 'space-between', overflow: 'hidden', }}
            >
              <Text>{ product.name }</Text>
              <Text
                numberOfLines={1}
                style={{ flex: 1 }}
                ellipsizeMode="clip"
              >....................................................................................</Text>
              <Text>
                {
                  product.price ? (
                    `R$ ${ product.saleStatus
                      ? product.salePrice.toFixed(2).toString().replace('.', ',')
                      : product.price.toFixed(2).toString().replace('.', ',') }`
                  ) : (
                    'R$ 0,00'
                  )
                }
              </Text>
            </View>
          ) : <></>
        }
        {
          options.map((option) => (
            <View
              key={Math.random()}
              style={{ flexDirection: 'row', justifyContent: 'space-between', overflow: 'hidden', }}
            >
              <Text>{ option.name }</Text>
              <Text
                numberOfLines={1}
                style={{ flex: 1 }}
                ellipsizeMode="clip"
              >....................................................................................</Text>
              <Text>
                {
                  option.price ? (
                    `R$ ${ option.price.toFixed(2).toString().replace('.', ',') }`
                  ) : (
                    'R$ 0,00'
                  )
                }
              </Text>
            </View>
          ))
        }
        

        <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
          <Title style={{ marginTop: 20 }}>
            Valor final:
          </Title>
          <Title style={{ marginTop: 20 }}>
            R$ { price.toFixed(2).toString().replace('.', ',') }
          </Title>
        </View>
        
      </View>

      <Button
        onPress={addToCart}
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