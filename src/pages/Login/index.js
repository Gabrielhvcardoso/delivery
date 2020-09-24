import React from 'react';
import { Dimensions, ImageBackground, StatusBar } from 'react-native';

import { Button, TextInput } from 'react-native-paper';

let image = 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80';

const Login = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: image }}
      style={{
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + StatusBar.currentHeight
      }}>
      <StatusBar barStyle="light-content" />

      <TextInput label="E-mail" mode="outlined" />
      <TextInput label="Senha" mode="outlined" />

      <Button
        onPress={() => navigation.navigate("Register")}
        style={{ marginTop: 15 }}
      >Registrar-se</Button>
    </ImageBackground>
  );
}

export default Login;