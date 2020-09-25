import React, { useContext } from 'react';
import { Text, View, } from 'react-native';
import { List, Avatar, Divider, Button } from 'react-native-paper';

import { Container } from './styles';

import AuthContext from '../../context/AuthContext';

const Options = ({ navigation }) => {
  const { setUserStatus } = useContext(AuthContext);

  return (
    <Container>
      <View style={{ padding: 20, flexDirection: 'row' }}>
        <Avatar.Text size={60} label="GC" />
        <View style={{ marginLeft: 10 }}>
          <Text style={{
            marginLeft: 15,
            fontSize: 18  
          }}>Gabriel Cardoso</Text>
          <Button>Editar perfil</Button>
        </View>
      </View>

      <Divider style={{ marginVertical: 20 }} />

      <List.Item
        title="Gerenciar endereços"
        description="Adicione e remova endereços de entrega"
        onPress={() => navigation.navigate('AndressManager')}
        left={props => (
          <List.Icon {...props} icon="map-marker-outline" />
        )}
      />
      <List.Item
        title="Favoritos"
        description="Meus pratos favoritos"
        onPress={() => navigation.navigate('Favorites')}
        left={props => (
          <List.Icon {...props} icon="heart-multiple-outline" />
        )}
      />
      <List.Item
        title="Termos de uso"
        description="Política de privacidade"
        onPress={() => navigation.navigate('Agreement')}
        left={props => (
          <List.Icon {...props} icon="file-document-outline" />
        )}
      />

      <List.Item
        title="Sair"
        onPress={() => setUserStatus(false)}
        left={props => (
          <List.Icon {...props} icon="exit-to-app" />
        )}
      />
      <List.Item
        title="Ajuda"
        onPress={() => navigation.navigate('Help')}
        left={props => (
          <List.Icon {...props} icon="information-outline" />
        )}
      />
    </Container>
  );
}

export default Options;