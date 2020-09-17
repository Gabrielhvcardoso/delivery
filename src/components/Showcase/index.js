import React, { useContext, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import GeneralContext from '../../context';

const Showcase = () => {
  const { isShowcaseVisible, dismissShowcase, showcaseImage } = useContext(GeneralContext)

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const animation = useRef(new Animated.Value(0));
  
  const translateX = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: [-screenWidth, 0],
    extrapolate: "clamp"
  });

  const onAnimationEnd = ({ finished }) => {
    if (finished === true) {
      animation.current.setValue(0);
      dismissShowcase();
    }
  }

  const stopAnimation = () => {
    animation.current.stopAnimation();
  }

  const startAnimation = () => {
    if (isShowcaseVisible) {
      Animated.timing(animation.current, {
        toValue: 100,
        duration: 5000,
        useNativeDriver: true
      }).start(onAnimationEnd);
    }
  }

  return (
    <Modal
      visible={isShowcaseVisible}
      onRequestClose={dismissShowcase}
      onShow={startAnimation}
    >
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Animated.View style={{ 
        zIndex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: '#fff',
        height: 5,
        transform: [{ translateX }],
      }} />
      <ImageBackground
        source={{ uri: showcaseImage }}
        style={{ width: screenWidth, height: screenHeight }}
        blurRadius={20}
        fadeDuration={0}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onPress={dismissShowcase}
          onPressIn={stopAnimation}
          onPressOut={startAnimation}
        >
          <Image
            source={{ uri: showcaseImage }}
            style={{
              width: screenWidth,
              height: screenWidth,
              resizeMode: 'cover'
            }} 
          />
        </TouchableOpacity>
      </ImageBackground>
    </Modal>
  );
}

export default Showcase;