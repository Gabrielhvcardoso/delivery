import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as ThemeProvider } from 'react-native-paper';

import ContextProvider from './src/context';
import Routes from './src/routes';

export default function App() {

  const theme = {
    ...DefaultTheme, colors: {
      ...DefaultTheme.colors,
      primary: '#FFC800',
      accent: '#2b7ed7'
    }
  }
  
  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style="inverted" />
        <Routes />
      </ThemeProvider>
    </ContextProvider>
  );
}
