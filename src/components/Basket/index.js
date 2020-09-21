import { StatusBar } from 'expo-status-bar';
import React, { useContext, useMemo } from 'react';
import { View, Dimensions, Modal, Text, Image, TouchableOpacity } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { Icon } from 'react-native-elements';

import { Container } from './styles';

import Suggestion from './Suggestion';
import Section from './Section';

import BasketContext from '../../context/BasketContext';
import * as RootNavigation from '../../RootNavigation';

import data from '../../data';

const Basket = () => {
  const { products, isBasketVisible, dismissBasket, showBasket } = useContext(BasketContext);
  const { categories } = data;
  const productsArray = categories.flatMap(item => item.products);


  const finalPricing = useMemo(() => products.reduce((acumulador, item) => acumulador + item.price, 0), [products])

  return (
    <Modal
      visible={isBasketVisible}
      onRequestClose={dismissBasket}
      animationType="slide"
    >
      <Container>
        <StatusBar backgroundColor="#fff" style="dark" />
        <View style={{ flexDirection: 'row' }}>
          <Icon name="close" type="material-community" onPress={dismissBasket} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
            Sua sacola
          </Text>
        </View>
        
        <Divider style={{ marginVertical: 10 }} />

        <View style={{ flex: 1 }}>
          {
            !products[0] ? (
              <Text
                style={{ textAlign: 'center', marginTop: Dimensions.get('window').height / 2 - 50 }}
              >Parece que não há nada aqui ainda</Text>
            ) : (
              <>
                <TouchableOpacity
                  style={{ padding: 10, marginBottom: 15, flexDirection: 'row' }}
                  activeOpacity={0.8}
                  onPress={() => {
                    dismissBasket();
                    RootNavigation.navigate('AndressSelector', {
                      goBack: () => showBasket(),
                    });
                  }}
                >
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

                <View style={{ marginTop: 30 }}>
                  <Text
                    style={{ fontSize: 19, marginHorizontal: 10 }}
                  >Escolha também</Text>
                  <Suggestion
                    style={{ marginHorizontal: -15 }}
                    array={productsArray}
                  />
                </View> 
        

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <Text style={{ fontSize: 18 }}>Valor final </Text>
                  <Text style={{ fontSize: 18, flex: 1 }} numberOfLines={1} ellipsizeMode={"clip"}>...........................................................................................</Text>
                  <Text style={{ fontSize: 18 }}> R$ { finalPricing.toFixed(2).toString().replace('.', ',') }</Text>
                </View>
                <Button
                  mode="contained"
                  style={{ marginTop: 20, paddingVertical: 10 }}
                >Escolher forma de pagamento</Button>
              </>
            )
          }
        </View>

      </Container>        
    </Modal>
  );
}

export default Basket;
