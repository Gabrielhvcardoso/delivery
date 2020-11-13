import React, { useContext, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Title } from '../styles';

import ClientContext from '../../../context/ClientContext';
import ThemeContext from '../../../context/ThemeContext';
import ProductContext from '../context';
import { Icon } from 'react-native-elements';

const Text = styled.Text`
  font-family: Inter Regular;
`;

const Footer = ({ product }) => {
  const { isOpen } = useContext(ClientContext);
  const { mode, main, soft, surface, text } = useContext(ThemeContext);
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
        borderTopColor: soft,
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
                  <Text style={{ color: text }}>{ product.name }</Text>
                    <Text
                      numberOfLines={1}
                      style={{ flex: 1, color: text }}
                      ellipsizeMode="clip"
                    > ....................................................................................</Text>
                    <Text style={{ color: text }}>
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
              <Text style={{ color: text }}>{ option.name }</Text>
              <Text
                numberOfLines={1}
                style={{ color: text, flex: 1 }}
                ellipsizeMode="clip"
              > ....................................................................................</Text>
              <Text style={{ color: text }}>
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
          <Title style={{ color: text, marginTop: 20 }}>
            Valor final:
          </Title>
          <Title style={{ color: text, marginTop: 20 }}>
            R$ { price.toFixed(2).toString().replace('.', ',') }
          </Title>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity
          disabled={quantity === 1}
          onPress={() => setQuantity(quantity - 1)}
          style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: surface, width: 50, height: 50 }}
        >
          <Text style={{ color: text }}>-</Text>
        </TouchableOpacity>

        <Text style={{ height: 50, textAlignVertical: 'center', backgroundColor: soft, color: text, flex: 1, textAlign: 'center', }}>
          {quantity}
        </Text>

        <TouchableOpacity
          onPress={() => setQuantity(quantity + 1)}
          style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: surface, width: 50, height: 50 }}
        >
          <Text style={{ color: text }}>+</Text>
        </TouchableOpacity>
      </View>

      {
        !isOpen ? (
          <View style={{ alignItems: 'center', borderRadius: 10, flexDirection: 'row', backgroundColor: mode === 'light' ? '#FFF3CD' : '#F5B83D', marginTop: 20, padding: 20 }}>
            <Icon name="alert-circle-outline" type="material-community" color={mode === 'light' ? '#93751B' : '#282C34'} />
            <Text style={{ marginLeft: 10, color: mode === 'light' ? '#93751B' : '#282C34' }}>A loja está atualmente fechada</Text>
          </View>
        ) : <></>
      }
      <Button
        disabled={!isOpen}
        onPress={addToCart}
        style={{
          backgroundColor: mode === 'light' ? main.lighten(0.9).hex() : main,
          marginTop: 20,
          elevation: 0,
          paddingVertical: 10
        }}
        labelStyle={{ color: mode === 'light' ? main.hex() : text.negate().hex() }}
        mode="contained"
        // icon="cart"
      >
        Adicionar ao carrinho
      </Button>
    </View>
  );
}

export default Footer;