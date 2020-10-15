import React, { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Temp data
import data from './data';

// Pages
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Options from './pages/Options';
import Orders from './pages/Orders';

// NotLogged Pages
import Apresentation from './pages/Apresentation';
import Login from './pages/Login';
import Register from './pages/Register';

// Components
import AndressSelector from './components/AndressSelector';

// ***
import { navigationRef } from './RootNavigation';
import AuthContext from './context/AuthContext';

const horizontalLogo = require('../assets/client/logo.png');

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

// Main route
const Routes = () => {
  const { user, isUserLogged } = useContext(AuthContext);

  if (!isUserLogged) {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Apresentation" component={Apresentation} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerStyle: { elevation: 0 }, title: 'Cadastro' }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerStyle: { elevation: 0 } }}>

        <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />

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
          name="AndressSelector"
          component={AndressSelector}
          options={{
            headerTintColor: 'black',
            headerTitle: '',
            headerTransparent: true
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTabs = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
        inactiveTintColor: '#666',
        style: {
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          elevation: 0,
          height: 60,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          borderTopColor: 'transparent'
        }
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          switch (route.name) {
            case 'Home':
              return <Icon name={'home'} size={size+5} color={color} type="feather" />;
            case 'Orders':
              return <Icon name={'shopping-bag'} size={size+5} color={color} type="feather" />;
            case 'Options':
              return <Icon name={'menu'} size={size+5} color={color} type="feather" />;
          }
        }
      })}
    >
      <Tabs.Screen name="Home" component={Home} options={{ title: 'Principal' }} />
      <Tabs.Screen name="Orders" component={Orders} options={{ title: 'Pedidos' }} />
      <Tabs.Screen name="Options" component={Options} options={({ route }) => {
          return {
            title: 'Menu',
            headerShown: false,
            tabBarVisible: true
          }
        }} />
    </Tabs.Navigator>
  );
}

export default Routes;
