import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Container, CategoryScrollView } from './styles';
import { FAB } from 'react-native-paper';
import styled from 'styled-components';

import BasketContext from '../../context/BasketContext';

import { useFetch } from '../../hooks/useFetch';
import { useToken } from '../../hooks/useToken';
import { FlatList, Image, RefreshControl, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <StatusBar style="dark" />

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
      
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={() => {
            setIsRefresh(true);
            getProducts(() => {
              setIsRefresh(false);
            });
          }} />
        }
        style={{ backgroundColor: 'white' }}
        data={categories}
        contentContainerStyle={{ padding: 15 }}
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
      />
        {/* <CategoryScrollView categories={categories} /> */}
    </>
  );
}

export default Home;