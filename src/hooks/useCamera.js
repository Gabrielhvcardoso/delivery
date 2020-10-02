import * as ImagePicker from 'expo-image-picker';

export async function useCamera(onSuccess, onError) {
  const { permissionStatus } = await ImagePicker.requestCameraPermissionsAsync();
  
  if (permissionStatus !== undefined && permissionStatus !== 'granted') {
    onError();
  }
  
  else {
    ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1]
    }).then((response) => {
      onSuccess(response);
    });
  }
  
  return null;
}
