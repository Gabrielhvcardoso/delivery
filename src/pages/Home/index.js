import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CategoryScrollView } from './styles';
import { FAB } from 'react-native-paper';
import styled from 'styled-components';

import BasketContext from '../../context/BasketContext';

import { useFetch } from '../../hooks/useFetch';
import { useToken } from '../../hooks/useToken';
import { Animated, Dimensions, Image, RefreshControl, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Container } from './container';

export const Text = styled.Text`
  font-size: 23px;
  font-family: Inter SemiBold;
  margin: 0px 20px;
`;

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const { showBasket, products } = useContext(BasketContext);
  const [isRefresh, setIsRefresh] = useState(false);

  const getProducts = (onEnd = () => {}) => {
    useFetch.get('/p/all/' + useToken(), (response) => {
      setCategories(response.categories);
      onEnd();
    });
  }

  useEffect(() => getProducts(), []);

  return (
    <Container
      data={categories}
      image="https://lh3.googleusercontent.com/proxy/d69sBOKZf3yhWnA7KOruqdyvVIhvN17A9pOOf8R9AZZbYcjNpVuH9ryAbjVkxdsVRieLvEyETtWMWDbcA4ELSdAw2PVSjcFJdGLascjYbNM4iE9uhPwqrM480UJEvCSn68kRG1vROOzfAxE0DAAKVxtHBcukvw"
    >
      <StatusBar style="light" />

      <View style={{ }} />



      {
        products[0] ? (
          <FAB
            style={{ position: 'absolute', bottom: 90, right: 20, zIndex: 1 }}
            onPress={() => showBasket()}
            icon={() => <Icon name="shopping-bag" type="feather" color="white" />}
            label="Ver pedido"
          />
        ) : <></>
      }
      

      {/* <Animated.FlatList
        style={{
          backgroundColor: '#f2f2f2',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: headerHeight,
          zIndex: 1,
          flex: 1
        }}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={() => {
            setIsRefresh(true);
            getProducts(() => {
              setIsRefresh(false);
            });
          }} />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue }  }}], { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        data={categories}
        contentContainerStyle={{ padding: 15, paddingTop: 20, paddingBottom: 60 }}
        keyExtractor={(category) => category.categoryId.toString()}
        numColumns={2}
        renderItem={({ item}) => {

          return (
            <TouchableOpacity
              style={{ flex: 1, marginBottom: 20 }}
              key={Math.random() * Math.random()}
              onPress={() => navigation.navigate("Category", { category: item })}
            >
              <View>
                <Image
                  style={{ flex: 1, height: 150, marginHorizontal: 5, borderRadius: 4 }}
                  source={{ uri: item.image }}
                />
                <Text numberOfLines={1} style={{ width: 170, marginLeft: 5, marginRight: 5, fontSize: 16 }}>
                  { item.name }
                </Text>
              </View>
            </TouchableOpacity>
          )
        }}
      /> */}
    </Container>
  );
}

export default Home;