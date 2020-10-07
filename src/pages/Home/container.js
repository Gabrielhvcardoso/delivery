import React from 'react';
import { View, Animated, Dimensions, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Container = ({ data, image }) => {
  const navigation = useNavigation();

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
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue }  }}], { useNativeDriver: false }
        )}
        data={data}
        keyExtractor={item => item.categoryId.toString()}
        numColumns={2}
        renderItem={({ item }) => {
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
                <Text numberOfLines={1} style={{ textAlign: 'center', width: 170, marginLeft: 5, marginRight: 5, fontSize: 14, marginTop: 7, color: '#444', fontFamily: 'Inter Medium' }}>
                  { item.name }
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        scrollEventThrottle={100}
        contentContainerStyle={{ padding: 25 }}
        style={{ 
          marginTop: headerHeight,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flex: 1,
          zIndex: 1
        }}
      >
      </Animated.FlatList>
      <Animated.Image
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').width * 0.8
        }}
        source={{ uri: image }}
      />
    </View>
  );
}