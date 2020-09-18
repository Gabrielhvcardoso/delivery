import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Divider, Dialog, Portal, Paragraph } from 'react-native-paper';

import { Container } from './styles';
import CartContext from '../../../context/CartContext';

const Section = ({ product }) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const { decreaseItem } = useContext(CartContext);
  const price = product.price + product.options.reduce((acumulador, item) => acumulador + item.price, 0);

  return (
    <Container>
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
          <Dialog.Content>
            <Paragraph>Tem certeza que remover esse item?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => setIsDialogVisible(false)}
              style={{ marginRight: 10 }}
            >Cancelar</Button>
            <Button
              onPress={() => decreaseItem(product.id)}
              mode="contained"
            >Sim, remover</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

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
            onPress={() => setIsDialogVisible(true)}  
          >
            REMOVER
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