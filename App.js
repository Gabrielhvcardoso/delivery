import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { configureFonts, DefaultTheme, Provider as ThemeProvider } from 'react-native-paper';

import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

import ContextProvider from './src/context';
import Routes from './src/routes';

export default function App() {

  const [loaded] = useFonts({
    'Inter Thin': require('./assets/fonts/Inter-Thin.otf'),
    'Inter Light': require('./assets/fonts/Inter-Light.otf'),
    'Inter Regular': require('./assets/fonts/Inter-Regular.otf'),
    'Inter Medium': require('./assets/fonts/Inter-Medium.otf'),
    'Inter SemiBold': require('./assets/fonts/Inter-SemiBold.otf'),
    'Inter Bold': require('./assets/fonts/Inter-Bold.otf'),
  })

  const fontsConfig = {
    default: {
      regular: {
        fontFamily: 'Inter Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Inter Medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Inter Light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Inter Thin',
        fontWeight: 'normal',
      },
    },
  };

  const theme = {
    ...DefaultTheme, 
    fonts: configureFonts(fontsConfig),
    colors: {
      ...DefaultTheme.colors,
      primary: '#3C88DA',
      accent: '#2b7ed7',
    }
  }

  if (!loaded) {
    return <AppLoading />;
  }
  
  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <StatusBar style="inverted" />
        <Routes />
      </ContextProvider>
    </ThemeProvider>
  );
}
