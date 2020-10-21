import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StatusBar, View } from 'react-native';
import styled from 'styled-components';

import AuthContext from '../../context/AuthContext';
import { useFetch } from '../../hooks/useFetch';

import BasketSvg from './BasketSvg';
import OrderItem from './OrderItem';
import HistoryItem from './HistoryItem';

const Text = styled.Text`
  font-family: Inter Regular;
`;

const Orders = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);

  const refresh = () => {
    setIsLoading(true);
    setIsRefresh(true);

    useFetch.post('/p/order', {
      userId: user.userId
    }, (response) => {
      setIsLoading(false);
      setIsRefresh(false);
      setOrders(response);
    });
  }

  console.log(orders)

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      useFetch.post('/p/order', {
        userId: user.userId
      }, (response) => {
        setIsLoading(false);
        setIsRefresh(false);
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
      refreshControl={
        <RefreshControl refreshing={isRefresh} onRefresh={refresh} />
      }
      style={{ flex: 1, backgroundColor: '#f2f2f2' }}
      contentContainerStyle={{
        paddingTop: StatusBar.currentHeight + 15,
        padding: 15,
        paddingBottom: 80,
      }}>
        <StatusBar barStyle="dark-content" />
        <Text style={{ fontSize: 24, fontFamily: 'Inter Bold' }}>Meus pedidos</Text>
        {
          orders[0] ? (
            <View>
              {
                orders.filter(item => item.status !== 0).map(order => <OrderItem key={order.identifier} order={order} />)
              }
              
              <View style={{ marginTop: 40, marginBottom: 20, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Inter Regular', fontSize: 17 }}>Pedidos antigos</Text>
              </View>

              {
                orders.filter(item => item.status === 0).map(history => <HistoryItem key={history.identifier} order={history} />)
              }
            </View>
            ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 200 }}>
              <BasketSvg />
              <Text style={{ fontSize: 20 }}>Nenhum pedido</Text>
              <Text>Explore os produtos e faça seu primeiro pedido</Text>
            </View>
          )
        }
    </ScrollView>
  );
}

export default Orders;