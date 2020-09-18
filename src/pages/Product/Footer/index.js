import React, { useContext, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { Text, View } from 'react-native';

import { Title } from '../styles';

import ProductContext from '../context';

const Footer = ({ product }) => {
  const { price, options, setProduct, addToCart } = useContext(ProductContext);

  useEffect(() => setProduct({
    name: product.name,
    price: product.price
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