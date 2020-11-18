import * as Facebook from 'expo-facebook';
// See: https://docs.expo.io/versions/v39.0.0/sdk/facebook/#registering-your-app-with-facebook

export async function loginWithFacebookAsync () {

  const options = {
    permissions: [
      // For more about Facebook permissions, see: https://developers.facebook.com/docs/permissions/reference

      'public_profile',
      'email'
    ],
  };
  
  try {
    // don't forgot to initialize the sdk before calling any facebook method
    // See: https://docs.expo.io/versions/v39.0.0/sdk/facebook/#facebookinitializeasyncoptions-facebookinitializationoptions-promisevoid
    Facebook.initializeAsync({
      appId: '1188603768207844',
      appName: 'Delivery Client Desenvolvimento',
      version: 'v2.7',
      autoLogAppEvents: false,
      domain: 'connect.facebook.net'
    }).then(() => {
      
      // this method returns { type: 'cancel' } or { type: 'success' } & [FacebookAuthenticationCredential]
      Facebook.logInWithReadPermissionsAsync(options).then((loginResult) => {
        const { type, token, expirationDate, permissions, declinedPermissions } = loginResult;
    
        if (type === 'success') {
          fetch(`https://graph.facebook.com/me?access_token=${token}`).then((response) => {
            response.json().then((data) => {
              console.log(data);
            })
          });
        }
        
        else {
          console.log("Error")
          // Handle failed login here
          // See: https://docs.expo.io/versions/v39.0.0/sdk/facebook/#error-codes
        }
      })
    })

  } catch ({ message }) {
    
    // See: https://docs.expo.io/versions/v39.0.0/sdk/facebook/#error-codes
    console.log("Facebook Login Error: " + message);
  }
}

export function facebookLogOutAsync () {
  return Facebook.logOutAsync();
}

export function getFacebookCredentials () {
  Facebook.getAuthenticationCredentialAsync().then((auth) => {

  });

  // auth : {
  //   Access token for the authenticated session. This token provides access to the Facebook Graph API.
  //   token: string,
  //
  //   App-scoped Facebook ID of the user.
  //   userId: string,
  //   
  //   Application ID used to initialize the Facebook SDK app.
  //   appId: string,
  //   
  //   List of granted permissions.
  //   permissions: string[] | undefined,
  //   
  //   List of requested permissions that the user has declined.
  //   declinedPermissions: string[] | undefined,
  //   
  //   List of permissions that were expired with this access token.
  //   expiredPermissions: string[] | undefined,
  //   
  //   Time at which the token expires.
  //   expirationDate: Date,
  //   
  //   Time at which the current user data access expires.
  //   dataAccessExpirationDate: Date,
  //   
  //   The last time the token was refreshed (or when it was first obtained).
  //   refreshDate: Date | undefined,
  //   
  //   (Android only) Indicates how this token was obtained.
  //   tokenSource: string | undefined,
  //   
  //   A valid raw signed request as a string.
  //   signedRequest: string | undefined,
  //   
  //   A website domain within the Graph API.
  //   graphDomain: string | undefined
  // }
}