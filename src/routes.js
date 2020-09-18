import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Options from './pages/Options';

import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

import data from './data';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const Routes = () => {
  const { horizontalLogo } = data;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { elevation: 0 } }}>

        <Stack.Screen
        name="Home" 
        component={BottomTabs}
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
          options={{
            headerTintColor: 'white',
            headerTitle: '',
            headerTransparent: true
          }}
        />

        <Stack.Screen
          name="StackCart"
          component={Cart}
          options={{
            title: 'Carrinho'
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <Icon name={'home'} size={size+5} color={color} type="material-community" />;
            case 'Cart':
              return <Icon name={'cart-outline'} size={size+5} color={color} type="material-community" />;
            case 'Options':
              return <Icon name={'menu'} size={size+5} color={color} type="material-community" />;
          }
        }
      })}
    >
      <Tabs.Screen name="Home" component={Home} options={{ title: 'Principal' }} />
      <Tabs.Screen name="Cart" component={Cart} options={{ title: 'Pedidos' }} />
      <Tabs.Screen name="Options" component={Options} options={{ title: 'Menu' }} />
    </Tabs.Navigator>
  );
}

export default Routes;
