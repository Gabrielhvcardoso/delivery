import React, { useContext } from 'react';
import { View, Dimensions, Modal, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Divider } from 'react-native-paper';

import HorizontalList from '../HorinzontalList';

import { Container } from './styles';
import Section from './Section';

import BasketContext from '../../context/BasketContext';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
            Sua sacola
          </Text>
        </View>
        
        <Divider style={{ marginVertical: 10 }} />

        <View style={{ flex: 1 }}>
          {
            products[0] ? (
              <>
                <TouchableOpacity style={{ padding: 10, marginBottom: 15, flexDirection: 'row' }}>
                  <Image
                    source={require('../../../assets/images/map.jpg')}
                    style={{ width: 65, height: 65, borderRadius: 10, resizeMode: 'contain'}}
                  />
                  <View style={{ flex: 1, marginLeft: 12, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 17, color: '#666' }}>Entregar em <Text style={{ fontWeight: 'bold' }}>Casa</Text></Text>
                    <Text numberOfLines={1} style={{ fontSize: 15, flex: 1 }}>Rua Affonso Nicoluzzi, 2515 - Rau - Jaraguá do Sul - SC</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 13, color: '#666' }}>ALTERAR </Text>
                      <Icon name="chevron-right" type="material-community" color="#666" size={15} />
                    </View>
                  </View>
                </TouchableOpacity>

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
        </View>

        <View style={{ marginTop: 30 }}>
          <Text
            style={{ fontSize: 19, marginHorizontal: 10 }}
          >Escolha também</Text>
          <HorizontalList style={{ marginHorizontal: -15 }} />
        </View>
        
        <Button
          mode="contained"
          style={{ marginTop: 20, paddingVertical: 10 }}
        >Escolher forma de pagamento</Button>
      </Container>
    </Modal>
  );
}

export default Basket;
