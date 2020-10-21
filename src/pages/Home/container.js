import React, { useContext } from 'react';
import { View, Animated, Dimensions, TouchableOpacity, Image, Text, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import ThemeContext from '../../context/ThemeContext';

export const Container = ({ data, image }) => {
  const { background, main, muted, soft, surface, text } = useContext(ThemeContext);
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
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue }  }}], { useNativeDriver: false }
        )}
        scrollEventThrottle={100}
        contentContainerStyle={{ paddingTop: 25, paddingBottom: 60 }}
        style={{ 
          marginTop: headerHeight,
          backgroundColor: background,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flex: 1,
          zIndex: 1
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25, marginHorizontal: 25, }}>
          <Icon name="search" color={text} type="feather" />
          <TextInput
            style={{
              borderRadius: 40,
              color: text,
              fontFamily: 'Inter Regular',
              fontSize: 16,
              flex: 1,
              paddingVertical: 5,
              paddingHorizontal: 15
            }}
            placeholderTextColor={muted}
            placeholder="Pesquisar produto"
          />
        </View>


        <Text style={{ marginLeft: 25, marginBottom: 15, fontFamily: 'Inter Bold', fontSize: 20 }}>Veja categorias</Text>
        <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 15 }}>
          {
            data.map(item => (
              <TouchableOpacity
                style={{ flex: 1, marginBottom: 20 }}
                key={Math.random() * Math.random()}
                onPress={() => navigation.navigate("Category", { category: item })}
              >
              <View>
                  <Image
                    style={{ flex: 1, height: 100, width: 120, marginHorizontal: 5, borderRadius: 4 }}
                    source={{ uri: item.image }}
                  />
                  <Text numberOfLines={1} style={{ textAlign: 'center', width: 120, marginLeft: 5, marginRight: 5, fontSize: 14, marginTop: 7, color: '#444', fontFamily: 'Inter Medium' }}>
                    { item.name }
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </ScrollView>


        <Text style={{ marginLeft: 25, marginBottom: 15, fontFamily: 'Inter Bold', fontSize: 20 }}>Populares</Text>
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