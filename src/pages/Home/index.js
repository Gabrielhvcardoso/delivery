import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FAB } from 'react-native-paper';
import styled from 'styled-components';

import AuthContext from '../../context/AuthContext';
import BasketContext from '../../context/BasketContext';
import ThemeContext from '../../context/ThemeContext';

import { useFetch } from '../../hooks/useFetch';
import { useToken } from '../../hooks/useToken';
import { Animated, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, StatusBar, View } from 'react-native';
import { Icon } from 'react-native-elements';

import Product from '../Category/Product';
import image from '../../../assets/images/home.jpg';

import Search from './Search';

import { useShuffle } from '../../hooks/useShuffle';
import { generateExpoPushNotificationToken as registerForPushNotificationsAsync } from '../../services/notifications';

// Notifications setup

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  })
});

// Notifications setup

export const Text = styled.Text`
  font-size: 23px;
  font-family: Inter SemiBold;
  margin: 0px 20px;
`;

const Home = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { background, main, muted, soft, surface, text } = useContext(ThemeContext);

  const [categories, setCategories] = useState([]);
  const suggestions = useMemo(() => categories.flatMap(item => item.products), [categories]);
  const [isSearch, setIsSearch] = useState(false);

  const { showBasket, products } = useContext(BasketContext);

  // Notifications setup

  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    const { userId } = user;

    registerForPushNotificationsAsync(userId).then(token => {
      setExpoPushToken(token)
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // do something;
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  // Notifications setup
  

  const getProducts = (onEnd = () => {}) => {
    useFetch.get('/p/all/' + useToken(), (response) => {
      setCategories(response.categories);
      onEnd();
    });
  }

  useEffect(() => getProducts(), []);

  const headerMaxHeight = 250;
  const headerMinHeight = 100;
  const scrollYAnimatedValue = new Animated.Value(0);
  const headerHeight = scrollYAnimatedValue.interpolate({
    inputRange: [0, headerMaxHeight],
    outputRange: [headerMaxHeight, headerMinHeight],
    extrapolate: 'clamp'
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Search
        visible={isSearch}
        onDismiss={() => setIsSearch(false)}
        categories={categories}
        products={products}
      />

      {
        products[0] ? (
          <FAB
            style={{ backgroundColor: main, position: 'absolute', bottom: 90, right: 20, zIndex: 2 }}
            onPress={() => showBasket()}
            icon={() => <Icon name="shopping-bag" type="feather" color="white" />}
            label="Ver pedido"
          />
        ) : <></>
      }

      <Animated.ScrollView
        removeClippedSubviews

        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue }  }}], { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 25, paddingBottom: 80 }}
        style={{ 
          marginTop: headerHeight,
          backgroundColor: background,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flex: 1,
          zIndex: 1
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={() => setIsSearch(true)} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25, marginHorizontal: 25, }}>
          <Icon name="search" color={text} type="feather" />
          <TextInput
            editable={false}
            style={{
              borderRadius: 40,
              color: text,
              fontFamily: 'Inter Regular',
              fontSize: 16,
              flex: 1,
              paddingVertical: 5,
              paddingHorizontal: 15
            }}
            placeholder="Pesquisar produto"
            placeholderTextColor={muted}
          />
        </TouchableOpacity>


        <Text style={{ color: text, marginLeft: 25, marginBottom: 15, fontFamily: 'Inter Bold', fontSize: 20 }}>Cardápio</Text>
        <ScrollView removeClippedSubviews horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
          {
            categories.map(item => (
              <TouchableOpacity
                style={{ flex: 1, marginBottom: 20 }}
                key={Math.random() * Math.random()}
                onPress={() => navigation.navigate("Category", { category: item })}
              >
              <View>
                  <Image
                    style={{ flex: 1, height: 100, width: 120, marginHorizontal: 5, borderRadius: 10 }}
                    source={{ uri: item.image }}
                  />
                  <Text numberOfLines={1} style={{ textAlign: 'center', width: 120, marginLeft: 5, marginRight: 5, fontSize: 14, marginTop: 7, color: muted, fontFamily: 'Inter Medium' }}>
                    { item.name }
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>

        {
          suggestions.filter(item => item.saleStatus)[0] ? (
            <Text style={{ color: text, marginLeft: 25, marginTop: 25, fontFamily: 'Inter Bold', fontSize: 20 }}>Promoções</Text>
          ) : <></>
        }

        <View style={{ paddingHorizontal: 20 }}>
          {
            suggestions.filter(item => item.saleStatus).map((item) => {
              return (
                <Product key={Math.random() * Math.random()} product={item} />
              );
            })
          }
        </View>

        <Text style={{ color: text, marginTop: 35, marginLeft: 25, fontFamily: 'Inter Bold', fontSize: 20 }}>Populares</Text>

        <View style={{ paddingHorizontal: 20 }}>
          {
            useShuffle(suggestions).filter(item => !item.saleStatus).slice(0, 10).map((item) => {
              return (
                <Product key={Math.random() * Math.random()} product={item} />
              );
            })
          }
        </View>
        

        
      </Animated.ScrollView>
      <Animated.Image
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').width * 0.8
        }}
        source={image}
      />
    </View>
  );
}

export default Home;
