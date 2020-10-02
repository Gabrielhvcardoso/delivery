import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Image from '../../../components/Image';

// import { Container } from './styles';

const Product = ({ product }) => {
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
          <Text numberOfLines={2} style={{ fontSize: 17, color: '#222', fontWeight: 'bold' }}>
            { product.name }
          </Text>

          {
            product.saleStatus ? (
              <Text style={{ backgroundColor: '#E1EDF9', paddingHorizontal: 5, borderRadius: 10, fontSize: 12, textAlignVertical: 'center' }}>Promoção</Text>
            ) : <></>
          }
        </View>

        <Text numberOfLines={2} style={{ color: '#666' }}>
          { product.details }
        </Text>
        {
          product.saleStatus ? (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 17, color: 'red', textAlign: 'right', textDecorationLine: 'line-through' }}>
                R$ { product.price.toFixed(2).toString().replace('.', ',') }
              </Text>
              <Text style={{ fontSize: 17, color: '#222', marginLeft: 10, fontWeight: 'bold', textAlign: 'right' }}>
                R$ { product.salePrice.toFixed(2).toString().replace('.', ',') }
              </Text>
            </View>
          ) : (
            <Text style={{ fontSize: 17, color: '#222', fontWeight: 'bold', textAlign: 'right' }}>
              R$ { product.price.toFixed(2).toString().replace('.', ',') }
            </Text>
          )
        }
        
      </TouchableOpacity>
    </View>
  );
}

export default Product;