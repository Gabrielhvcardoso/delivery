import React, { useContext, useEffect, useState } from 'react';
import { Animated, Image, Modal, View, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import styled from 'styled-components';

import BasketContext from '../../../context/BasketContext';
import ThemeContext from '../../../context/ThemeContext';


const Text = styled.Text`
  font-family: Inter Regular;
`;

const Section = ({ product }) => {
  const { background, main, muted, soft, surface, text } = useContext(ThemeContext);
  const { decreaseItem, products, setProducts } = useContext(BasketContext);
  const [deleteTouch, setDeleteTouch] = useState(false);

  const [quantity, setQuantity] = useState(product.quantity);
  const [quantityModal, setQuantityModal] = useState(false);
  const dismissModal = () => setQuantityModal(false);

  const price = product.price * product.quantity + product.options.reduce((acumulador, item) => acumulador + item.price * product.quantity, 0);

  const deleteAnimation = new Animated.Value(0);

  useEffect(() => {
    // Altera a quantidade do item

    let index = products.findIndex(item => item.id === product.id);
    let newProducts = products;
    newProducts[index].quantity = quantity;
    setProducts(newProducts);
  }, [quantity]);

  const onDelete = () => {
    Animated.timing(deleteAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      decreaseItem(product.id);
    });
  }

  const translateX = deleteAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
    extrapolate: 'clamp'
  });

  const opacity = deleteAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });


  return (
    <Animated.View
      style={{
        backgroundColor: surface,
        borderRadius: 8,
        marginTop: 15,
        padding: 15,
        opacity,
        transform: [{
          translateX: translateX
        }]
      }}
    >
      <Modal
        transparent
        animationType="fade"
        visible={quantityModal}
        onRequestClose={dismissModal}
      >
        <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <TouchableOpacity onPress={dismissModal} style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={dismissModal} style={{ flex: 1 }} />
            <View style={{ flexDirection: 'row', padding: 10, backgroundColor: surface, minWidth: '80%' }}>
              <TouchableOpacity
                disabled={quantity === 1}
                onPress={() => setQuantity(quantity - 1)}
                style={{ height: 60, width: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: soft }}
              >
                <Text style={{ color: text }}>-</Text>
              </TouchableOpacity>
              <Text style={{ color: text, fontFamily: 'Inter Regular', textAlign: 'center', textAlignVertical: 'center', height: 60, flex: 1, backgroundColor: soft }}>
                { quantity }
              </Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={{ height: 60, width: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: soft }}>
                <Text style={{ color: text }}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={dismissModal} style={{ flex: 1 }} />
          </View>
          <TouchableOpacity onPress={dismissModal} style={{ flex: 1 }} />
        </View>
      </Modal>

      <View style={{ flexDirection: 'row', backgroundColor: surface }}>
        <Image
          source={{ uri: product.image }}
          style={{ height: 50, width: 50, borderRadius: 10 }}
        />
        <TouchableOpacity disabled onPress={() => setQuantityModal(true)} style={{ flexDirection: 'column', marginLeft: 15, flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text numberOfLines={1} style={{ color: text, fontSize: 19, flex: 1, fontFamily: 'Inter Bold' }}>{ product.quantity}x { product.name }</Text>
            <Text style={{ color: text, flex: 1, fontSize: 17, textAlign: 'right' }}>
              R$ { product.price.toFixed(2).toString().replace('.', ',') }
            </Text>
          </View>


          {
            !product.options[0] ? (
              <Text style={{ color: muted }}>
                Nenhum adicional
              </Text>
            ) : (
              <>
                {
                  product.options.map(option => (
                    <View
                      key={Math.random() * Math.random()}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, }}
                    >
                      <Text style={{ color: text }}>{ option.name }</Text>

                      <Text style={{ color: text }}>
                        {
                          option.price ? (
                            `R$ ${ option.price ? option.price.toFixed(2).toString().replace('.', ',') : '' }`
                          ) : (
                            'R$ 0,00'
                          )
                        }
                      </Text>
                    </View>
                  ))
                }
              </>
            )
          }
        </TouchableOpacity>
      </View>  
      

      <Divider style={{ marginVertical: 15 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{ padding: 5 }}>
          <Text
            style={{ fontSize: 13, color: '#F00' }}
            onPress={ deleteTouch ? () => onDelete() : () => setDeleteTouch(true)}  
          >
            { deleteTouch ? 'CLIQUE PARA CONFIRMAR' : 'REMOVER' }
          </Text>
        </TouchableOpacity>
        <Text style={{ color: text, flex: 1, fontSize: 17, textAlign: 'right' }}>
          R$ { price.toFixed(2).toString().replace('.', ',') }
        </Text>
      </View>
      
    </Animated.View>
  );
}

export default Section;