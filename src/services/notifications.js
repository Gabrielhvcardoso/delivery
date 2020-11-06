import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Alert, Platform } from 'react-native';

import { useFetch } from '../hooks/useFetch';

/*

  To do

  - Create a LocalStorage Field to expo push token
  - Set user token after login, or every access
  - Create a notification sender on API
  - Set a notification trigger to every user's interesting action

*/


export async function generateExpoPushNotificationToken (userId) {
  let token;

  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = status;
  
  if (status !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') { return; }

  token = await Notifications.getExpoPushTokenAsync();

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF2B7ED7',
    });
  }

  fetch('https://push-services.herokuapp.com/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      application: "5",
      token: token.data,
      platform: Platform.OS === 'android' ? 'android' : 'ios'
    })
  }).then((response) => {
    response.json().then((data) => {
      switch(data.code) {
        case 'success-subscribe': break;
        case 'already-subscrived': break;
        case 'error-subscribe': 
          Alert.alert('Erro', 'Erro ao inscrever-se para notificações', [{ text: 'Ok' }]);
          console.log(data);
          break;
      }
    });
  });

  useFetch.post('/p/u/token', {
    userId,
    token: token.data,
  }, (response) => {
    console.log(response)

    if (response.code === 'error') {
      console.log("Error on update token")
    }
  })

  return token;
}



