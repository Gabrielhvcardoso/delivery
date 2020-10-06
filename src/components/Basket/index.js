import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, Dimensions, Modal, Image, TouchableOpacity, Modal as NativeModal } from 'react-native';
import { Button, Divider, Menu } from 'react-native-paper';
import { Icon } from 'react-native-elements';

import styled from 'styled-components';

import { Container } from './styles';

import Suggestion from './Suggestion';
import Section from './Section';

import AuthContext from '../../context/AuthContext';
import BasketContext from '../../context/BasketContext';
import * as RootNavigation from '../../RootNavigation';

import { useFetch } from '../../hooks/useFetch';
import { useToken } from '../../hooks/useToken';

const Text = styled.Text`
  font-family: Inter Regular;
`;

const Basket = () => {
  const { products, isBasketVisible, dismissBasket, showBasket, handleSendOrder } = useContext(BasketContext);
  const { user, setUser } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const productsArray = categories.flatMap(item => item.products);

  const [andress, setAndress] = useState({ andress: '', andressId: 0, latitude: 0, longitude: 0 });
  const [isAndressModal, setIsAndressModal] = useState(false);
  const dismissModal = () => setIsAndressModal(false);

  const [paymentMethod, setPaymentMethod] = useState("Dinheiro");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isPaymentMethodModal, setIsPaymentMethodModal] = useState(false);
  const dismissPMModal = () => setIsPaymentMethodModal(false);

  useEffect(() => {
    if (user.andress) {
      if (user.andress[0]?.andress !== null) {
        setAndress(user.andress[0]);
      }
    }
  }, []);

  useEffect(() => {
    useFetch.get('/p/all/' + useToken(), (response) => {
      setCategories(response.categories);
    });

    useFetch.get('/p/paymethods/' + useToken(), (response) => {
      setPaymentMethods(response);
    })
  }, []);

  const finalPricing = useMemo(() => products.reduce((acumulador, item) => {
    acumulador += item.price;

    if (item.options[0]) {
      for (let counter = 0; counter < item.options.length; counter ++) {
        acumulador += item.options[counter].price 
      }
    }
  
    return acumulador;
  }, 0), [products]);

  return (
    <Modal
      visible={isBasketVisible}
      onRequestClose={dismissBasket}
      animationType="slide"
    >
      <NativeModal
        transparent
        animationType="fade"
        visible={isPaymentMethodModal}
        onRequestClose={dismissPMModal}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={dismissPMModal} />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={dismissPMModal} />
            <View style={{ backgroundColor: '#f2f2f2', borderRadius: 8, width: '90%', padding: 20 }}>
              {
                paymentMethods.map(item => {
                  
                  const handleSelect = () => {
                    setPaymentMethod(item);
                    setIsPaymentMethodModal(false)
                  }
                  
                  return (
                    <Menu.Item key={Math.random()} title={item} onPress={handleSelect} />
                  );
                })
              } 
            </View>
            <TouchableOpacity style={{ flex: 1 }} onPress={dismissPMModal} />
          </View>
          <TouchableOpacity style={{ flex: 1 }} onPress={dismissPMModal} />
        </View>
      </NativeModal>

      <NativeModal 
        transparent
        animationType="fade"
        visible={isAndressModal}
        onRequestClose={dismissModal}  
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={dismissModal} />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={dismissModal} />
            <View style={{ backgroundColor: '#f2f2f2', borderRadius: 8, width: '90%', padding: 20, paddingBottom: 10 }}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Selecionar um endereço</Text>
              {
                user.andress?.map(item => (
                  <TouchableOpacity
                    onPress={() => {
                      setAndress(item);
                      setIsAndressModal(false);
                    }}
                    key={Math.random()}
                    style={{ elevation: 3, marginBottom: 10, padding: 15, borderRadius: 4, backgroundColor: 'white' }}
                  >
                    <Text numberOfLines={1} style={{ fontSize: 17 }}>{ item.andress }</Text>
                    <Text style={{ fontSize: 13, color: 'grey' }}>Selecionar</Text>
                  </TouchableOpacity>
                ))
              }
              <TouchableOpacity
                onPress={() => {
                  dismissBasket();

                  RootNavigation.navigate('AndressSelector', {
                    goBack: (data) => {
                      const newAndress = {
                        userId: user.userId,
                        ...data,
                      };

                      useFetch.post('/p/u/a/create', newAndress, (response) => {
                        const justNowCreatedAndress = {
                          andressId: response.id,
                          ...data
                        };
                        
                        const newAndressArr = user.andress;
                        newAndressArr.push(justNowCreatedAndress);
                        setUser({...user, andress: newAndressArr });
                        setAndress(justNowCreatedAndress);

                        setIsAndressModal(false);
                        showBasket();
                      })
                    }
                  })
                }}
                style={{ elevation: 3, marginTop: 10, marginBottom: 10, padding: 15, borderRadius: 4, backgroundColor: 'white' }}
              >
                <Text numberOfLines={1} style={{ fontSize: 17 }}>Selecionar outro</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ flex: 1 }} onPress={dismissModal} />
          </View>
          <TouchableOpacity style={{ flex: 1 }} onPress={dismissModal} />
        </View>
      </NativeModal>

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
                    setIsAndressModal(true)
                  }}
                >
                  <Image
                    source={require('../../../assets/images/map.jpg')}
                    style={{ width: 65, height: 65, borderRadius: 10, resizeMode: 'contain'}}
                  />
                  <View style={{ flex: 1, marginLeft: 12, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 17, color: '#666' }}>Entregar no <Text style={{ fontWeight: 'bold' }}>endereço</Text></Text>
                    <Text numberOfLines={1} style={{ fontSize: 15, flex: 1 }}>
                      {
                        andress.andress === '' ? 'Selecione o seu endereço' : andress.andress
                      }
                    </Text>

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
                
                <View style={{ marginTop: 15, paddingTop: 5 }}>
                  <Text style={{ fontSize: 12, marginLeft: 8 }}>Forma de pagamento</Text>
                  <TouchableOpacity
                    onPress={() => setIsPaymentMethodModal(true)}
                    style={{
                      marginTop: 4,
                      height: 50,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      paddingHorizontal: 17,
                      borderRadius: 6
                    }}
                  >
                    <Text style={{ fontSize: 17 }}>{ paymentMethod }</Text>
                    <Icon name="menu-down" type="material-community" />
                  </TouchableOpacity>
                </View>
                
                
                <Button
                  onPress={() => handleSendOrder(andress.andressId, paymentMethod)}
                  mode="contained"
                  style={{ marginTop: 20, paddingVertical: 10 }}
                >continuar</Button>
              </>
            )
          }
        </View>

      </Container>        
    </Modal>
  );
}

export default Basket;
