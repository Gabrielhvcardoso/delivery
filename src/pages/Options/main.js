import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import styled from 'styled-components';

import { Container } from './styles';

import AuthContext from '../../context/AuthContext';
import ThemeContext from '../../context/ThemeContext';

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

const Options = ({ navigation }) => {
  const { setUserStatus, user } = useContext(AuthContext);
  const { background, main, muted, soft, surface, text } = useContext(ThemeContext);

  return (
    <Container style={{ backgroundColor: background }}>
      <View style={{ marginTop: 40, backgroundColor: surface, margin: 15, borderRadius: 10, padding: 20, flexDirection: 'row', alignItems: 'center' }}>
        {
          user.image ? (
            <Avatar.Image source={{ uri: user.image }} />
          ) : (
            <Avatar.Text size={60} label={getFirstLetters(user.name)} />
          )
        }
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginLeft: 25 }}>
          <Text style={{
            color: text,
            fontSize: 18  
          }}>
            { user.name }
          </Text>
          <Text style={{ color: 'grey' }}>Editar perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: surface, margin: 15, borderRadius: 10 }}>
        <List.Item
          style={{ fontFamily: 'Inter Regular' }}
          titleStyle={{ color: text }}
          descriptionStyle={{ color: 'grey' }}
          title="Gerenciar endereços"
          description="Adicione e remova endereços de entrega"
          onPress={() => navigation.navigate('AndressManager')}
          left={() => (
            <List.Icon color={text} icon="map-marker-outline" />
          )}
        />
        <List.Item
          title="Favoritos"
          titleStyle={{ color: text }}
          descriptionStyle={{ color: 'grey' }}
          description="Meus pratos favoritos"
          onPress={() => navigation.navigate('Favorites')}
          left={() => (
            <List.Icon color={text} icon="heart-multiple-outline" />
          )}
        />
        <List.Item
          title="Personalizar"
          titleStyle={{ color: text }}
          descriptionStyle={{ color: 'grey' }}
          description="Temas, mudar cores"
          onPress={() => navigation.navigate('Colors')}
          left={() => (
            <List.Icon color={text} icon="palette-outline" />
          )}
        />
        <List.Item
          title="Termos de uso"
          titleStyle={{ color: text }}
          descriptionStyle={{ color: 'grey' }}
          description="Política de privacidade"
          onPress={() => navigation.navigate('Agreement')}
          left={() => (
            <List.Icon color={text} icon="file-document-outline" />
          )}
        />

        <List.Item
          title="Sair"
          titleStyle={{ color: text }}
          descriptionStyle={{ color: 'grey' }}
          onPress={() => setUserStatus(false)}
          left={() => (
            <List.Icon color={text} icon="exit-to-app" />
          )}
        />
        <List.Item
          title="Ajuda"
          titleStyle={{ color: text }}
          descriptionStyle={{ color: 'grey' }}
          onPress={() => navigation.navigate('Help')}
          left={() => (
            <List.Icon color={text} icon="information-outline" />
          )}
        />
      </View>
    </Container>
  );
}

export default Options;