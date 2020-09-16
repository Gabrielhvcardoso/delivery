import React, { createContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Showcase from './src/components/Showcase';

const GeneralContext = createContext({
  showImage: () => {}
});

export default function App() {
  const [isShowcaseVisible, setIsShowcaseVisible] = useState(false);
  const [showcaseImage, setShowcaseImage] = useState("");

  const showImage = (image) => {
    setShowcaseImage(image);
    setIsShowcaseVisible(true);
  }

  return (
    <GeneralContext.Provider value={{ showImage }}>
      <StatusBar style="auto" />
      <Showcase image={showcaseImage} visible={isShowcaseVisible} dismiss={() => setIsShowcaseVisible(false)} />
  
      <View style={styles.container}>
        <TouchableOpacity onPress={() => showImage('https://i.pinimg.com/originals/8b/45/8c/8b458c60804e58c26b09cf1f4253eb29.jpg')}>
          <Text>Open up App.js to start working on your app!</Text>
        </TouchableOpacity>
      </View>
    </GeneralContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
