import React, { useContext } from 'react';
import { Dimensions, ImageBackground, StatusBar, Text, View, TouchableOpacity } from 'react-native';

import AuthContext from '../../context/AuthContext';

import { loginWithGoogleAsync } from '../../auth/googleAuth';
import { loginWithFacebookAsync } from '../../auth/facebookAuth';
import { Container, Button } from './styles';

const Apresentation = ({ navigation }) => {
  const { setUserStatus } = useContext(AuthContext);
  const image = { uri : 'https://images.unsplash.com/photo-1526367790999-0150786686a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80' }

  return (
    <ImageBackground source={image} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height + StatusBar.currentHeight }}>
      <Container>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1 }} />

        <Button iconColor="red" onPress={() => navigation.navigate('Login')} icon="email" color="white" mode="dark">Entrar com o E-mail</Button>
        <Button icon="google" onPress={() => loginWithGoogleAsync(setUserStatus)} color="white" mode="dark">Entrar com o Google</Button>
        {/* <Button disabled icon="facebook" onPress={loginWithFacebookAsync} mode="light">Entrar com o Facebook</Button> */}

        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => navigation.navigate("Register")}
          style={{
            marginVertical: 30,
            paddingVertical: 5
          }}
        >
          <Text style={{
            alignSelf: 'center',
            color: 'white',
            fontFamily: 'Inter SemiBold',
            maxWidth: '90%',
            textAlign: 'center',
          }}>Ainda não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
        
      </Container>
    </ImageBackground>
  );
}

export default Apresentation;