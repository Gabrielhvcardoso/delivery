import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';

const Stack = createStackNavigator();

import data from './data';
import { Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

const Routes = () => {
  const { horizontalLogo } = data;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { elevation: 0 } }}>

        <Stack.Screen
        name="Home" 
        component={Home}
        options={{
          headerTitle: '',
          
          headerBackground: () => (
            <SafeAreaView style={{ backgroundColor: 'white', flex: 1, display: 'flex' }}>
              <Image 
                source={{ uri: horizontalLogo }}
                style={{ resizeMode: 'contain', flex: 1 }}  
              />
            </SafeAreaView>
          ) 
          }}
        />

        <Stack.Screen
          name="Category"
          component={Category}
          options={({ navigation }) => ({
            title: '',
            headerTransparent: true,
            headerLeft: () => (
              <Icon
                onPress={() => navigation.goBack()}
                containerStyle={{ elevation: 10, marginLeft: 20, backgroundColor: 'white', padding: 5, borderRadius: 100 }}
                name="arrow-left"
                type="material-community"
                color="black"
              />
            )
          })}
        />

        <Stack.Screen
          name="Product"
          component={Product}
          options={({ route }) => {
            const { product } = route.params;

            return ({
              headerTintColor: 'white',
              headerTitle: '',
              headerTransparent: true
            });
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
