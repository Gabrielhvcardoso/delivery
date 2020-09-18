import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

export const CategoryScrollView = ({ categories }) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Categorias</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 15 }}
      >
        {
          categories.map(category => (
            <TouchableWithoutFeedback
              key={Math.random() * Math.random()}
              onPress={() => navigation.navigate("Category", { category })}
            >
              <View>
                <Image
                  style={{ width: 120, height: 120, marginHorizontal: 5, borderRadius: 12 }}
                  source={{ uri: category.image }}
                />
                <Text numberOfLines={1} style={{ width: 120, marginLeft: 5, marginRight: 5, fontSize: 15 }}>
                  { category.name }
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </ScrollView>
    </View>
  );
}

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Text = styled.Text`
  font-size: 23px;
  font-weight: bold;
  margin: 0px 20px;
`;