import * as ImagePicker from 'expo-image-picker';

export async function useLibrary(onSuccess, onError) {
  const { permissionStatus } = await ImagePicker.requestCameraRollPermissionsAsync();
  
  if (permissionStatus !== undefined && permissionStatus !== 'granted') {
    onError();
  }
  
  else {
    await ImagePicker.launchImageLibraryAsync({
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