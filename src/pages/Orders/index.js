import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, Text, View } from 'react-native';
import { Divider, ProgressBar } from 'react-native-paper';

import AuthContext from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';

const Orders = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      useFetch.post('/p/order', {
        userId: user.userId
      }, (response) => {
        setIsLoading(false);
        setOrders(response);
      });
    });
    
    return unsubscribe;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="black" size="small" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'white' }}
      contentContainerStyle={{
        paddingTop: StatusBar.currentHeight + 15,
        padding: 15
      }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Meus pedidos</Text>
        {
          orders.map(order => (
            <View
              key={Math.random()}
              style={{
                borderTopWidth: 3,
                borderTopColor: 'grey',
                backgroundColor: 'white',
                borderRadius: 8,
                elevation: 3,
                marginTop: 10,
                padding: 15,
                marginBottom: 15
              }}
            >
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>
                  {
                    order.status === 0 
                      ? 'Pedido entrege'
                      : order.status === 1
                        ? 'Aguardando confirmação'
                        : order.status === 2
                          ? 'Seu pedido está sendo preparado'
                          : 'Seu pedido saiu para entrega'
                  }
                </Text>
                {
                  order.status === 1 || order.status === 2 ? (
                    <ProgressBar indeterminate style={{ marginBottom: 5 }} />
                  ) : order.status === 0 ? (
                    <ProgressBar progress={1} style={{ marginBottom: 5 }} color="grey" />
                  ) : (
                    <ProgressBar progress={1} style={{ marginBottom: 5 }} />
                  )
                }
                <Text>{ order.andress }</Text>
                <Text>{ order.paymentMethod }</Text>
                <Text style={{ color: 'grey' }}>Há 3 minutos</Text>
              </View>

              <Divider style={{ marginVertical: 10 }} />

              {
                order.products.map(product => (
                  <View key={Math.random()}>
                    <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                      <Text>{ product.productName }</Text>
                      <Text>R$ { product.price.toFixed(2).toString().replace('.', ',') }</Text>
                    </View>
                    <View style={{
                      marginVertical: 4,
                    }}>
                      {
                        product.observation?.map(observation => (
                          <View key={Math.random()} style={{
                            borderLeftWidth: 3,
                            borderLeftColor: 'grey',
                            paddingLeft: 10,
                            flex: 1,
                            justifyContent: 'space-between',
                            flexDirection: 'row'
                          }}>
                            <Text style={{ fontSize: 13 }}>{ observation.item }</Text>
                            <Text style={{ fontSize: 13 }}>{ parseFloat(observation.price).toFixed(2).toString().replace('.',',') }</Text>
                          </View>
                        ))
                      }
                    </View>
                  </View>
                ))
              }
            </View>
          ))
        }
        
    </ScrollView>
  );
}

export default Orders;