import React, { useContext, useState } from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

import BasketContext from '../../../context/BasketContext';

const Section = ({ product }) => {
  const [deleteTouch, setDeleteTouch] = useState(false);

  const { decreaseItem } = useContext(BasketContext);
  const price = product.price + product.options.reduce((acumulador, item) => acumulador + item.price, 0);

  const deleteAnimation = new Animated.Value(0);

  const onDelete = () => {
    Animated.timing(deleteAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      decreaseItem(product.id);
    })
  }

  const translateX = deleteAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
    extrapolate: 'clamp'
  })

  const opacity = deleteAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })


  return (
    <Animated.View style={{
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 2,
      marginTop: 15,
      padding: 15,
      opacity,
      transform: [{
        translateX: translateX
      }]
    }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: product.image }}
          style={{ height: 100, width: 100, borderRadius: 10 }}
        />
        <View style={{ flexDirection: 'column', marginLeft: 15, flex: 1 }}>
          <Text numberOfLines={1} style={{ flex: 1, fontSize: 19, fontWeight: 'bold' }}>{ product.name }</Text>
          {
            product.options[0] ? (
              <Divider style={{ marginVertical: 5 }} />
            ) : <></>
          }
          {
            product.options.map(option => (
              <View
                key={Math.random() * Math.random()}
                style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, }}
              >
                <Text>{ option.name }</Text>

                <Text>
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
        </View>
        
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
        
        <Text style={{ flex: 1, fontSize: 17, textAlign: 'right' }}>
          R$ { price.toFixed(2).toString().replace('.', ',') }
        </Text>
      </View>
      
    </Animated.View>
  );
}

export default Section;