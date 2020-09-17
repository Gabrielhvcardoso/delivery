import React from 'react';
import { Text, View, } from 'react-native';
import { List, Avatar, Divider, Button } from 'react-native-paper';

import { Container } from './styles';

const Options = ({ navigation }) => {
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
        left={props => (
          <List.Icon {...props} icon="map-marker-outline" />
        )}
      />
      <List.Item
        title="Favoritos"
        description="Meus pratos favoritos"
        left={props => (
          <List.Icon {...props} icon="heart-multiple-outline" />
        )}
      />
      <List.Item
        title="Termos de uso"
        description="Política de privacidade"
        left={props => (
          <List.Icon {...props} icon="file-document-outline" />
        )}
      />

      <List.Item
        title="Ajuda"
        left={props => (
          <List.Icon {...props} icon="information-outline" />
        )}
      />
      <List.Item
        title="Configurações"
        left={props => (
          <List.Icon {...props} icon="settings-outline" />
        )}
      />

    </Container>
  );
}

export default Options;