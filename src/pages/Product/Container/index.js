import React, { useLayoutEffect, useState } from 'react';
import { Animated, StatusBar, Dimensions, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { BlurView } from 'expo-blur'

const Container = ({ children, image, favorite }) => {
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

  // Header Buttons Animation

  const buttonsOpacity = scrollYAnimatedValue.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });


  const buttonsTransform = buttonsOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [-15, 0],
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
        <Animated.View style={{
          height: 100 - StatusBar.currentHeight - 10,
          width: 70,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Icon
            name={favorite ? "heart" : "heart-outline"}
            type="material-community"
            color="white"
            size={26}
          />
        </Animated.View>
      </Animated.View>

    </View>    
  )
};

export default Container;
