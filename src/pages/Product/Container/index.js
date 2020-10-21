import React, { useContext } from 'react';
import { Animated, Dimensions, View } from 'react-native';

import { BlurView } from 'expo-blur'
import ThemeContext from '../../../context/ThemeContext';

const Container = ({ children, image }) => {
  const { background, main, muted, soft, surface, text } = useContext(ThemeContext);

  const screenWidth = Dimensions.get('window').width;

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

  // Header Animation

  const headerMaxHeight = screenWidth/2;
  const headerMinHeight = 100;

  const scrollYAnimatedValue = new Animated.Value(0);
  const headerHeight = scrollYAnimatedValue.interpolate({
    inputRange: [0, headerMaxHeight],
    outputRange: [headerMaxHeight, headerMinHeight],
    extrapolate: 'clamp'
  });

  const headerBlur = scrollYAnimatedValue.interpolate({
    inputRange: [0, headerMaxHeight],
    outputRange: [0, 120],
    extrapolate: 'clamp'
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.Image
        style={{
          position: 'absolute',
          width: screenWidth,
          height: headerHeight
        }}
        source={{ uri: image }}
      />

      <AnimatedBlurView
        intensity={headerBlur}
        tint="dark"
        style={{ position: 'absolute', width: screenWidth, height: screenWidth }}
      >
      </AnimatedBlurView>

      <Animated.ScrollView
        removeClippedSubviews
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue }  }}], { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        style={{
          marginTop: headerHeight,
          flex: 1,
          flexDirection: 'column',
          backgroundColor: background
        }} 
      > 
        <Animated.View style={{ padding: 20 }}>
          
          { children }
        </Animated.View>
      </Animated.ScrollView>
    </View>    
  )
};

export default Container;
