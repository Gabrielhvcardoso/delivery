import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';

export const Container = ({ children }) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      { children }
    </ScrollView>
  );
}
