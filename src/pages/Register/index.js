import React, { useContext, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { Button, Dialog, Portal, DialogContent, TextInput as PaperTextInput, ActivityIndicator } from 'react-native-paper';

import styled from 'styled-components';
import { useFetch } from '../../hooks/useFetch';
import { useToken } from '../../hooks/useToken';

import AuthContext from '../../context/AuthContext';

const TextInput = styled(PaperTextInput)`
  background-color: white;
  margin-bottom: 10px;
`;

const Register = ({ navigation }) => {
  const { setUserStatus } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message) => {
    setErrorMessage(message);
    setIsError(true);
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rpass, setRpass] = useState("");

  const onRegisterRequest = () => {
    if (name === '') {
      showError("O Campo \"Nome\" está vazio");
      return;
    }

    if (email === '') {
      showError("O Campo \"E-mail\" está vazio");
      return;
    }

    if (pass === '') {
      showError("O Campo \"Senha\" está vazio");
      return;
    }

    if (rpass === '') {
      showError("O Campo \"Repita a senha\" está vazio");
      return;
    }

    if (!email.includes("@")) {
      showError("Email inválido");
      return;
    }

    if (rpass !== pass) {
      showError("As senhas não coincidem");
      return;
    }

    setIsLoading(true);
    useFetch.post('/p/u/create', {
      name,
      email,
      password: pass,
      token: useToken()
    }, (response) => {
      if (response.code) {
        setIsLoading(false);
        if (response.message === 'email already in use') {
          showError("Este e-mail já foi cadastrado no sistema.");
        } else {
          showError(response.message);
        }
      } else {
        setUserStatus(true, response);
      }
    });
  }

  if (isLoading) {
    navigation.setOptions({
      headerShown: false,
    });

    return (
      <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="black" size="small" />
      </View>
    );
  } else {
    navigation.setOptions({
      headerShown: true,
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
      <Portal>
        <Dialog visible={isError} onDismiss={() => setIsError(false)}>
          <Dialog.Content>
            <Text> { errorMessage } </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsError(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <TextInput value={name} onChangeText={text => setName(text)} label="Nome" />
        <TextInput value={email} onChangeText={text => setEmail(text)} label="E-mail" />
        <TextInput secureTextEntry value={pass} onChangeText={text => setPass(text)} label="Senha" />
        <TextInput secureTextEntry value={rpass} onChangeText={text => setRpass(text)} label="Repita a senha" />
      </View>

      <Button onPress={onRegisterRequest} mode="contained">Cadastrar-se</Button>
    </View>
  );
}

export default Register;