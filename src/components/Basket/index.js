import React, { useContext } from 'react';
import { View, Dimensions, Modal, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Divider } from 'react-native-paper';

import { Container } from './styles';

import BasketContext from '../../context/BasketContext';
import { Icon } from 'react-native-elements';

const Basket = () => {
  const { products, isBasketVisible, dismissBasket } = useContext(BasketContext);

  return (
    <Modal
      visible={isBasketVisible}
      onDismiss={dismissBasket}
      animationType="slide"
    >
      <Container>
        <StatusBar style="dark" />
        <View style={{ flexDirection: 'row' }}>
          <Icon name="close" type="material-community" onPress={dismissBasket} />
        </View>
        {
          products[0] ? (
            <>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
                Seu pedido
              </Text>
              <Divider style={{ marginVertical: 10 }} />
              {
                products.map((product) => {
                  return (
                    <Section product={product} key={Math.random() * Math.random()} />
                  );
                })
              }
            </>
          ) : (
            <Text
              style={{ textAlign: 'center', marginTop: Dimensions.get('window').height / 2 - 50 }}
            >Parece que não há nada aqui ainda</Text>
          )
        }
      </Container>
    </Modal>
  );
}

export default Basket;
