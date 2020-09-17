import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as ThemeProvider } from 'react-native-paper';

import Routes from './src/routes';
import Showcase from './src/components/Showcase';

import { GeneralContextProvider } from './src/context';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#FFC800',
      accent: '#2b7ed7'
    }
  }
  
  return (
    <GeneralContextProvider>
      <StatusBar style="inverted" />
      <Showcase />
  
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </GeneralContextProvider>
  );
}
