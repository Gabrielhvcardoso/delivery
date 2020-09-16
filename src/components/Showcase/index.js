import React, { useEffect, useRef } from 'react';
import { Modal, Image, Dimensions, Animated, StatusBar, TouchableWithoutFeedback } from 'react-native';

const Showcase = ({ visible, dismiss, image }) => {
  let screenWidth = Dimensions.get('window').width;
  let animation = useRef(new Animated.Value(0));

  let onAnimationEnd = ({ finished }) => {
    if (finished === true) onDismiss();
  }

  useEffect(() => {
    if (visible) {
      Animated.timing(animation.current, {
        toValue: 100,
        duration: 5000,
        useNativeDriver: true
      }).start(onAnimationEnd);
    }
  }, [visible]);

  const onDismiss = () => {
    animation.current.setValue(0);
    dismiss();
  }
  
  const translateX = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: [-screenWidth, 0],
    extrapolate: "clamp"
  });

  const stopAnimation = () => {
    animation.current.stopAnimation();
  }

  const continueAnimation = () => {
    Animated.timing(animation.current, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: true
    }).start(onAnimationEnd);
  }

  return (
    <Modal visible={visible} onDismiss={onDismiss}>
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
        <TouchableWithoutFeedback
          onPress={onDismiss}
          onPressIn={stopAnimation}
          onPressOut={continueAnimation}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              resizeMode: 'cover'
            }} 
          />
        </TouchableWithoutFeedback>
    </Modal>
  );
}

export default Showcase;