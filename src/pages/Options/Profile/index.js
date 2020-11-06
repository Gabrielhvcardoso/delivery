import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Button, Dialog, Menu, Portal, TextInput, DefaultTheme } from 'react-native-paper';
import styled from 'styled-components';

import AuthContext from '../../../context/AuthContext';
import ThemeContext from '../../../context/ThemeContext';

import { useFetch } from '../../../hooks/useFetch';
import { useCamera } from '../../../hooks/useCamera';
import { useLibrary } from '../../../hooks/useLibrary';

const Text = styled.Text`
  font-family: Inter Regular;
`;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'orange',
    text: 'orange'
  }
}

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
  const { background, main, muted, soft, surface, text } = useContext(ThemeContext);

  const [isDialogActive, setIsDialogActive] = useState(false);
  const [name, setName] = useState(user.name);

  const handleCamera = () => {
    useCamera((image) => {
      if (!image.cancelled) {
        const data = new FormData();

        const uri = image.uri;
        const name = uri.split('/').pop();

        const match = /\.(\w+)$/.exec(name);
        let type = match ? `image/${match[1]}` : `image`;

        data.append("userId", 1)
        data.append("file", { name, type, uri, });

        useFetch.postFormData('/p/u/i/update', data, (response) => {
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
    <View style={{ flex: 1, paddingTop: 60, backgroundColor: background }}>
      <Portal>
        <Dialog visible={isDialogActive} onDismiss={() => setIsDialogActive(false)}>
          <Dialog.Content style={{ backgroundColor: surface }}>
            <Text style={{ marginBottom: 10, marginLeft: 10, fontSize: 12, color: muted, textTransform: 'uppercase' }}>Mudar imagem de perfil</Text>
            <Menu.Item titleStyle={{ color: text.hex() }} icon="camera" onPress={handleCamera} title="Câmera" />
            <Menu.Item titleStyle={{ color: text.hex() }} icon="image" onPress={handleLibrary} title="Biblioteca" />
          </Dialog.Content>
        </Dialog>
      </Portal>


      <View style={{ alignItems: 'center', height: 120 }} />
      <View style={{ flex: 1, backgroundColor: surface, paddingHorizontal: 15, paddingBottom: 15 }}>
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
            selectionColor={main}
            style={{ fontSize: 20, backgroundColor: surface, color: text }}
            theme={{
              colors: {
                primary: main.hex(),
                text: text.hex(),
                placeholder: text.hex()
              }}}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Button
            style={{ backgroundColor: main }}
            labelStyle={{ color: text.negate() }}
            mode="contained"
            size={"small"}
            contentStyle={{ height: 60 }}
          >
            Salvar alterações
          </Button>
        </View>
      </View>
    </View>
  );
}

export default Profile;