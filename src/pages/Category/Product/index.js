import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Image from '../../../components/Image';
import styled from 'styled-components';

import ThemeContext from '../../../context/ThemeContext';

const Text = styled.Text`
  font-family: Inter Regular;
`;

const Product = ({ product }) => {
  const { mode, background, main, muted, soft, surface, text } = useContext(ThemeContext);

  const navigation = useNavigation();

  if (product === undefined) {
    return <></>;
  }

  return (
    <View style={{ marginTop: 20, flexDirection: 'row' }}>
      <Image size="sm" uri={product.image} />
      <TouchableOpacity
        onPress={() => navigation.navigate("Product", { product })}
        style={{
          flex: 1,
          justifyContent: 'space-around',
          marginLeft: 10
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text numberOfLines={2} style={{ flex: 1, fontSize: 17, color: text, fontFamily: 'Inter SemiBold' }}>
            { product.name }
          </Text>

          {
            product.saleStatus ? (
              <Text
                style={{
                  backgroundColor: mode === 'light' ? main.lighten(0.9) : surface,
                  color: mode === 'light' ? main : text,
                  height: 20,
                  marginTop: 4,
                  paddingHorizontal: 5,
                  borderRadius: 10,
                  fontSize: 12,
                  textAlignVertical: 'center'
                }}>Promoção</Text>
            ) : <></>
          }
        </View>

        <Text numberOfLines={2} style={{ color: muted }}>
          { product.details }
        </Text>
        {
          product.saleStatus ? (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 17, flex: 1, color: 'red', textAlign: 'right', textDecorationLine: 'line-through' }}>
                R$ { product.price.toFixed(2).toString().replace('.', ',') }
              </Text>
              <Text style={{ fontSize: 17, color: text, marginLeft: 10, fontFamily: 'Inter SemiBold', textAlign: 'right' }}>
                R$ { product.salePrice.toFixed(2).toString().replace('.', ',') }
              </Text>
            </View>
          ) : (
            <Text style={{ fontSize: 17, color: text, fontFamily: 'Inter SemiBold', textAlign: 'right' }}>
              {
                product.price === 0 ? (
                  'Ver preços'
                ) : (
                  `R$ ${ product.price.toFixed(2).toString().replace('.', ',') }`
                )
              }
            </Text>
          )
        }
        
      </TouchableOpacity>
    </View>
  );
}

export default Product;