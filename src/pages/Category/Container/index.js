import React from 'react';
import { View, Animated, Dimensions } from 'react-native';

export const Container = ({ children, image }) => {
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
        style={{ 
          marginTop: headerHeight,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flex: 1,
          zIndex: 1
        }}
      >
        <Animated.View style={{ padding: 25 }}>
          { children }
        </Animated.View>
      </Animated.ScrollView>
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