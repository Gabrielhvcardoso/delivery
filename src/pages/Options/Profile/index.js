import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Button, Dialog, Menu, Portal, TextInput } from 'react-native-paper';
import styled from 'styled-components';

import AuthContext from '../../../context/AuthContext';

import { useFetch } from '../../../hooks/useFetch';
import { useCamera } from '../../../hooks/useCamera';
import { useLibrary } from '../../../hooks/useLibrary';

const Text = styled.Text`
  font-family: Inter Regular;
`;

function getFirstLetters (str) {
  if (!str) {
    return 'AB'
  }

  let words = str.trim().split(' ').length;

  if (words > 1) {
    let matches = str.match(/\b(\w)/g);
    return matches.slice(0, 2).join('').toUpperCase();
  } else {
    return str.slice(0, 2).toUpperCase();
  }
}

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  const [isDialogActive, setIsDialogActive] = useState(false);
  const [name, setName] = useState(user.name);

  const handleCamera = () => {
    useCamera((image) => {
      if (!image.cancelled) {

        console.log(image)

        const data = new FormData();

        const uri = image.uri;
        const name = uri.split('/').pop();

        const match = /\.(\w+)$/.exec(name);
        let type = match ? `image/${match[1]}` : `image`;

        data.append("userId", 1)
        data.append("file", { name, type, uri, });

        useFetch.postFormData('/p/u/i/update', data, (response) => {
          console.log(response);
          if (response.code === 'success') {
            const { image } = response;

            setUser({ ...user, image })
          } else {
            alert(response.message);
          }
        })
      }
    });
  }

  const handleLibrary = () => {
    useLibrary((image) => {
      if (!image.cancelled) {
        const data = new FormData();

        let uriParts = image.uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        data.append("userId", 1)
        data.append("file", {
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
          uri: data.uri,
        });

        useFetch.postFormData('/p/u/i/update', data, (response) => {
          console.log(response);
          if (response.code === 'success') {
            const { image } = response;

            setUser({ ...user, image })
          } else {
            alert(response.message);
          }
        })
      }
    });
  }


  return (
    <View style={{ flex: 1, paddingTop: 60 }}>
      <Portal>
        <Dialog visible={isDialogActive} onDismiss={() => setIsDialogActive(false)}>
          <Dialog.Content>
            <Text style={{ marginBottom: 10, marginLeft: 10, fontSize: 12, color: '#666', textTransform: 'uppercase' }}>Mudar imagem de perfil</Text>
            <Menu.Item icon="camera" onPress={handleCamera} title="Câmera" />
            <Menu.Item icon="image" onPress={handleLibrary} title="Biblioteca" />
          </Dialog.Content>
        </Dialog>
      </Portal>


      <View style={{ alignItems: 'center', height: 120 }} />
      <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15, paddingBottom: 15 }}>
        <View>
          {
            user.image ? (
              <TouchableOpacity onPress={() => setIsDialogActive(true)} style={{ alignSelf: 'center', transform: [{ translateY: -60 }] }}>
                <Avatar.Image size={120} source={{ uri: user.image }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsDialogActive(true)} style={{ alignSelf: 'center', transform: [{ translateY: -60 }] }}>
                <Avatar.Text size={120} label={getFirstLetters(user.name)} />
              </TouchableOpacity>
            )
          }
          <TextInput
            value={name}
            onChangeText={t => setName(t)}
            label="Nome"
            placeholder="Ex.: Geovana Lima"
            mode="outlined"
            style={{ fontSize: 20 }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Button mode="contained" size={"small"} contentStyle={{ height: 60 }}>
            Salvar alterações
          </Button>
        </View>
      </View>
    </View>
  );
}

export default Profile;