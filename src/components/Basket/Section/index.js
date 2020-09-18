import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Divider, Dialog, Portal, Paragraph } from 'react-native-paper';

import { Container } from './styles';
import BasketContext from '../../../context/BasketContext';

const Section = ({ product }) => {
  const [deleteTouch, setDeleteTouch] = useState(false);

  const { decreaseItem } = useContext(BasketContext);
  const price = product.price + product.options.reduce((acumulador, item) => acumulador + item.price, 0);

  return (
    <Container>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 1, fontSize: 17 }}>{ product.name }</Text>
      </View>

      {
        product.options[0]
          ? <Divider style={{ marginVertical: 15 }} />
          : <></>
      }
  
      {
        product.options.map(option => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{ option.name }</Text>
            <Text>R$ { option.price ? option.price.toFixed(2).toString().replace('.', ',') : '' }</Text>
          </View>
        ))
      }

      <Divider style={{ marginVertical: 15 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{ padding: 5 }}>
          <Text
            style={{ fontSize: 13, color: '#F00' }}
            onPress={ deleteTouch ? () => decreaseItem(product.id) : () => setDeleteTouch(true)}  
          >
            { deleteTouch ? 'CLIQUE PARA CONFIRMAR' : 'REMOVER' }
          </Text>
        </TouchableOpacity>
        
        <Text style={{ flex: 1, fontSize: 17, textAlign: 'right' }}>
          R$ { price.toFixed(2).toString().replace('.', ',') }
        </Text>
      </View>
      
    </Container>
  );
}

export default Section;