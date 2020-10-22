import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { ActivityIndicator, Button, Dialog, Portal } from 'react-native-paper';
import { TextInput } from './styles';

import { useFetch } from '../../hooks/useFetch';
import { useToken } from '../../hooks/useToken';

import AuthContext from '../../context/AuthContext';
import ThemeContext from '../../context/ThemeContext';
import { Icon } from 'react-native-elements';

let image = 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80';

const Login = ({ navigation }) => {
  const { mode, background, main, muted, soft, surface, text } = useContext(ThemeContext);
  const { setUserStatus } = useContext(AuthContext);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    
    const verifyUser = async () => {
      const userData = await AsyncStorage.getItem('user');

      if (!userData) {
        setIsLoading(false);
      }
    }

    verifyUser();
  }, []);

  const showError = (message) => {
    setErrorMessage(message);
    setIsError(true);
  }

  const onLoginRequest = () => {
    if (email === '') {
      showError("O campo E-mail está vazio.");
      return;
    }

    if (password === '') {
      showError("O campo Senha está vazio.");
      return;
    }

    if (!email.includes("@") || !email.includes('.com')) {
      showError("O E-mail inserido é inválido.");
      return;
    }

    setIsLoading(true);

    useFetch.post('/p/u/login', {
      token: useToken(),
      email,
      password
    }, (response) => {
      if (response.code) {
        setIsLoading(false);
        showError("Não foi possível completar o login usando estes dados.");
      } else {
        setUserStatus(true, response);
      }
    })
  }

  if (isLoading) {
    return (
      <View style={{ backgroundColor: background, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar barStyle={mode === 'light' ? 'dark-content' : 'light-content'} />
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      source={{ uri: image }}
      style={{
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        backgroundColor: background,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + StatusBar.currentHeight
      }}>
      <Portal>
        <Dialog visible={isError} onDismiss={() => setIsError(false)}>
          <Dialog.Content>
            <Text>{ errorMessage }</Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={() => setIsError(false)}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      
      <StatusBar barStyle={mode === 'light' ? "dark-content" : "light-content" } />

      <TextInput
        style={{ backgroundColor: surface, color: text }}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="E-mail"
      />
      <TextInput
        style={{ backgroundColor: surface, color: text }}
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Senha"
        />

      <Button
        onPress={onLoginRequest}
        contentStyle={{ height: 60, justifyContent: 'flex-start' }}
        icon={<Icon name="home" color="black" />}
        labelStyle={{
          fontFamily: 'Inter Regular',
        }}
        style={{
          marginTop: 10,
          backgroundColor: main,
          borderRadius: 10
        }}
        mode="contained"
      >
        <Text style={{ color: 'white', textTransform: 'capitalize', fontFamily: 'Inter SemiBold', fontSize: 18 }}>
          Entrar
        </Text>
      </Button>

      <Button
        contentStyle={{ justifyContent: 'flex-start' }}
        onPress={() => navigation.navigate("Register")}
        labelStyle={{ color: main, fontFamily: 'Inter Medium', textTransform: 'none' }}
        style={{ marginTop: 15 }} 
      >
        Ainda não tem uma conta? Registre-se
      </Button>
    </View>
  );
}

export default Login;