import * as Google from 'expo-google-app-auth';
import { Alert } from 'react-native';
// See https://docs.expo.io/versions/latest/sdk/google/#using-it-inside-of-the-expo-app

import { useFetch } from '../hooks/useFetch';
import { useToken } from '../hooks/useToken';

export async function loginWithGoogleAsync (setUserStatus) {
  
  // LogInConfig
  const config = {
    iosClientId: '726751765167-4lcllcj4imb3p2n592tfdu4gtve704hp.apps.googleusercontent.com', // string | undefined (required) - The iOS client id registered with Google for use in the Expo client app.
    androidClientId: '726751765167-agtetmurh7da2u2eq3qggov0ttmaohnv.apps.googleusercontent.com', // string | undefined (required) - The Android client id registered with Google for use in the Expo client app.
    iosStandaloneAppClientId: '726751765167-sqvdpnkafpj4cut3p1jovg6jfveu2a9k.apps.googleusercontent.com', // string | undefined (required) - The iOS client id registered with Google for use in a standalone app.
    androidStandaloneAppClientId: '726751765167-ssbvmm8d62o0cugcs4fm6osrg7b07qr5.apps.googleusercontent.com', // string | undefined (required) - The Android client id registered with Google for use in a standalone app.
    clientId: undefined, // string | undefined - If the platform-appropriate client ID is not provided, this will be used instead.
    language: 'pt-BR', // string | undefined

    // If the user's email address is known ahead of time, it can be supplied to be the default option. This maps to the OAuth login_hint prop.
    // OAuth login_hint: https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
    // scope: ['', ''], // string[] = ['profile', 'email']

    redirectUrl: '', // string | undefined
  };

  // Returns LoginResult
  const loginResult = await Google.logInAsync(config);
  console.log(loginResult);

  if (loginResult.type === 'success') {
    const { email, id, name, photoUrl } = loginResult.user;

    useFetch.post('/p/u/g/auth', {
      email, id, name, photoUrl, token: useToken()
    }, (response) => {
      console.log(useToken())

      if (!response.code) {
        setUserStatus(true, response);
      } else {
        Alert.alert("Algo de errado aconteceu", "Erro ao tentar logar 1 ", [{ text: 'Ok' }]);
      }
    })
  } else {
    Alert.alert("Algo de errado aconteceu", "Erro ao tentar logar 2", [{ text: 'Ok' }]);
  }


  // interface LoginResult {
  //   type: 'cancel' | 'success',
  //   accessToken: string | undefined,
  //   idToken: string | null,
  //   refreshToken: string | null,
  //   user: {
  //     id: string | undefined,
  //     name: string | undefined,
  //     givenName: string | undefined,
  //     familyName: string | undefined,
  //     photoUrl: string | undefined,
  //     email: string | undefined
  //   }
  // }

  // if (type === 'success') {
  //   // Then you can use the Google REST API
  //   let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
  //     headers: { Authorization: `Bearer ${accessToken}` },
  //   });
  // }
}