import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './main';
import AndressManager from './AndressManager';
import Agreement from './Agreement';
import Favorites from './Favorites';
import Help from './Help';
import Profile from './Profile';

import ThemeContext from '../../context/ThemeContext';

const Stack = createStackNavigator();

export default function Options ({ navigation, route }) {
  const { background, text } = useContext(ThemeContext);

  const setTabBarVisible = (value) => {
    navigation.setOptions({
      tabBarVisible: value
    });
  }

  useEffect(() => {
    if (route.state) {
      if (route.state.index === 0) {
        setTabBarVisible(true);
      } else {
        setTabBarVisible(false);
      }
    } else {
      setTabBarVisible(true);
    }
  }, [route]);

  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: text.hex(),
      headerStyle: {
        elevation: 0,
        backgroundColor: background
      }
    }}>
      <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
      <Stack.Screen name="AndressManager" component={AndressManager} options={{ headerTitle: 'Gerenciar endereços' }} />
      <Stack.Screen name="Agreement" component={Agreement} options={{ headerTitle: 'Termos de Uso' }} />
      <Stack.Screen name="Favorites" component={Favorites} options={{ headerTitle: 'Favoritos' }} />
      <Stack.Screen name="Help" component={Help} options={{ headerTitle: 'Ajuda' }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerTitle: 'Editar perfil', headerTransparent: true }} />
    </Stack.Navigator>
  )
}
