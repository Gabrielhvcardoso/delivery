import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

export const Container = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        { children }
      </ScrollView>
    </SafeAreaView>
  );
}
