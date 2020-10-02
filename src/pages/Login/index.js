import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StatusBar, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { ActivityIndicator, Button, Dialog, Portal, TextInput } from 'react-native-paper';

import { useFetch } from '../../hooks/useFetch';
import { useToken } from '../../hooks/useToken';

import AuthContext from '../../context/AuthContext';

let image = 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80';

const Login = ({ navigation }) => {
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

    if (!email.includes("@")) {
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
      <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar barStyle='dark-content' />
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
        backgroundColor: 'white',
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
      
      <StatusBar barStyle="dark-content" />

      <TextInput value={email} onChangeText={text => setEmail(text)} label="E-mail" mode="outlined" />
      <TextInput secureTextEntry value={password} onChangeText={text => setPassword(text)} label="Senha" mode="outlined" />

      <Button onPress={onLoginRequest} style={{ marginTop: 10 }} mode="contained">Entrar</Button>

      <Button
        onPress={() => navigation.navigate("Register")}
        style={{ marginTop: 15 }}
      >Registrar-se</Button>
    </View>
  );
}

export default Login;