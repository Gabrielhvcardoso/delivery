import * as Google from 'expo-google-app-auth';
// See https://docs.expo.io/versions/latest/sdk/google/#using-it-inside-of-the-expo-app

export function loginWithGoogleAsync () {
  
  // LogInConfig
  const config = {
    // The iOS client id registered with Google for use in the Expo client app.
    iosClientId: '', // string | undefined (required)

    // The Android client id registered with Google for use in the Expo client app.
    androidClientId: '', // string | undefined (required)

    // The iOS client id registered with Google for use in a standalone app.
    iosStandaloneAppClientId: '', // string | undefined (required)

    // The Android client id registered with Google for use in a standalone app.
    androidStandaloneAppClientId: '', // string | undefined (required)

    // If the platform-appropriate client ID is not provided, this will be used instead.
    clientId: '', // string | undefined

    // ISO language code ex (fr, en-US), this will choose which language is used in the Google sign-in UI. Defaults to the best estimation based
    // on the users browser.
    language: '', // string | undefined

    // If the user's email address is known ahead of time, it can be supplied to be the default option. This maps to the OAuth login_hint prop.
    // OAuth login_hint: https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
    scope: ['', ''], // string[] = ['profile', 'email']

    // Defaults to ${AppAuth.OAuthRedirect}:/oauth2redirect/google. Optionally you can define your own redirect URL, just make sure to see the note below.
    redirectUrl: '', // string | undefined

    /*
      Note on redirectUrl: If you choose to provide your own redirectUrl, it should start with the value returned by AppAuth.OAuthRedirect.
      This way, the method will function correctly and consistently whether you are testing in the Expo client or as a standalone app.
    */
  };

  // Returns LoginResult
  const { type, accessToken, user } = await Google.logInAsync(config);

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

  if (type === 'success') {
    // Then you can use the Google REST API
    let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
}