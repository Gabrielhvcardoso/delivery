import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import styled from 'styled-components';
import { Title } from '../styles';

import ProductContext from '../context';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Text = styled.Text`
  font-family: Inter Regular;
`;

const Footer = ({ product }) => {
  const { price, options, setProduct, addToCart, quantity, setQuantity } = useContext(ProductContext);

  useEffect(() => setProduct({
    productId: product.productId,
    name: product.name,
    price: product.saleStatus ? product.salePrice : product.price,
    image: product.image,
    quantity
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
              {
                product.price > 0 ? (
                  <>
                  <Text>{ product.name }</Text>
                    <Text
                      numberOfLines={1}
                      style={{ flex: 1 }}
                      ellipsizeMode="clip"
                    > ....................................................................................</Text>
                    <Text>
                      {
                        product.price ? (
                          ` R$ ${ product.saleStatus
                            ? product.salePrice.toFixed(2).toString().replace('.', ',')
                            : product.price.toFixed(2).toString().replace('.', ',') }`
                        ) : (
                          ' R$ 0,00'
                        )
                      }
                    </Text>
                  </>
                ) : <></>
              }
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
              > ....................................................................................</Text>
              <Text>
                {
                  option.price ? (
                    ` + R$ ${ option.price.toFixed(2).toString().replace('.', ',') }`
                  ) : (
                    ' Grátis'
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

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity
          disabled={quantity === 1}
          onPress={() => setQuantity(quantity - 1)}
          style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee', width: 50, height: 50 }}
        >
          <Text>-</Text>
        </TouchableOpacity>

        <Text style={{ height: 50, textAlignVertical: 'center', backgroundColor: '#f4f4f4', flex: 1, textAlign: 'center', }}>
          {quantity}
        </Text>

        <TouchableOpacity
          onPress={() => setQuantity(quantity + 1)}
          style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee', width: 50, height: 50 }}
        >
          <Text>+</Text>
        </TouchableOpacity>
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