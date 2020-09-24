import React, { useContext } from 'react';
import { Image } from 'react-native';
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
import Login from './pages/Login';
import Register from './pages/Register';

// Components
import AndressSelector from './components/AndressSelector';

// ***
import { navigationRef } from './RootNavigation';
import AuthContext from './context/AuthContext';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

// Main route
const Routes = () => {
  const { isUserLogged } = useContext(AuthContext);
  const { horizontalLogo } = data;

  if (!isUserLogged) {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerStyle: { elevation: 0 }, title: 'Cadastro' }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  return (
    <NavigationContainer ref={navigationRef}>
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
        style: { elevation: 0 }
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <Icon name={'home'} size={size+5} color={color} type="material-community" />;
            case 'Orders':
              return <Icon name={'cart-outline'} size={size+5} color={color} type="material-community" />;
            case 'Options':
              return <Icon name={'menu'} size={size+5} color={color} type="material-community" />;
          }
        }
      })}
    >
      <Tabs.Screen name="Home" component={Home} options={{ title: 'Principal' }} />
      <Tabs.Screen name="Orders" component={Orders} options={{ title: 'Pedidos' }} />
      <Tabs.Screen name="Options" component={Options} options={{ title: 'Menu' }} />
    </Tabs.Navigator>
  );
}

export default Routes;
