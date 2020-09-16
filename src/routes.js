import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { elevation: 0 } }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="Product" component={Product} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
