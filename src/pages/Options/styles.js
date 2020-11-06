import React, { useContext } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import ThemeContext from '../../context/ThemeContext';

export const Container = ({ children }) => {
  const { background } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView removeClippedSubviews style={{ flex: 1, backgroundColor: background }}>
        { children }
      </ScrollView>
    </SafeAreaView>
  );
}
