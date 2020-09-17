import React from 'react';
import { Animated, StatusBar, Dimensions, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { BlurView } from 'expo-blur'

const Container = ({ children, image, favorite }) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);


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
    outputRange: [0, 100],
    extrapolate: 'clamp'
  });

  // Header Buttons Animation

  const buttonsOpacity = new Animated.Value(0);

  scrollYAnimatedValue.addListener(({ value }) => {
    if (value >= 50) {
      Animated.timing(buttonsOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(buttonsOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      }).start();
    }
  });

  const buttonsTransform = buttonsOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0],
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
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue }  }}], { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        style={{
          marginTop: headerHeight,
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white'
        }} 
      > 
        <Animated.View style={{ padding: 20 }}>
          
          { children }
        </Animated.View>
      </Animated.ScrollView>


      <Animated.View style={{
        position: 'absolute',
        top: StatusBar.currentHeight,
        right: 0,

        transform: [{ translateY: buttonsTransform }],
        opacity: buttonsOpacity
      }}>
        <AnimatedTouchable style={{
          height: 100 - StatusBar.currentHeight - 10,
          width: 100,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Icon
            name={favorite ? "heart" : "heart-outline"}
            type="material-community"
            color="white"
            size={26}
          />
        </AnimatedTouchable>
      </Animated.View>

    </View>    
  )
};

export default Container;
