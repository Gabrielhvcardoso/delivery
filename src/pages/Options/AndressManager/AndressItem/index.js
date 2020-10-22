import React, { useContext, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import ThemeContext from '../../../../context/ThemeContext';
import { useFetch } from '../../../../hooks/useFetch';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

const AndressItem = ({ removeItem, item }) => {
  const { mode, background, main, muted, soft, surface, text } = useContext(ThemeContext);
  const { name, number, observation, cep, state, city, neighborhood, street } = JSON.parse(item.andress);

  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [isMessageActive, setIsMessageActive] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = (string) => { setMessage(string); setIsMessageActive(true); }; 

  const navigation = useNavigation();

  const onGoBack = (data) => {
    useFetch.post('/p/u/a/update', {
      andressId: item.andressId,
      andress: JSON.stringify(data)
    }, (response) => {
      if (response.code === 'error') return alert('Algo de errado aconteceu.');
      
      const newUserAndressArr = andress;
      newUserAndressArr[andress.findIndex(obj => obj.andressId === item.andressId)] = ({ andressId: item.andressId, andress: data });
      setUser({...user, andress: newUserAndressArr });
    });
  }

  const handleEditAndress = () => navigation.navigate('AndressSelector', { andress: item.andress, goBack: onGoBack });

  const handleDeleteAndress = () => {
    useFetch.delete('/p/u/a/delete/' + item.andressId, (response) => {
      if (response.code === 'success') {
        setIsDeleteLoading(false);
        setIsDeleteActive(false);
        removeItem(item.andressId);
        showMessage("Endereço removido.");
      } else {
        setIsDeleteLoading(false);
        setIsDeleteActive(false);
        showMessage("Ocorreu um erro ao tentar excluir este endereço.");
      }
    });
  }

  return (
    <>
      <Portal>
        <Dialog style={{ backgroundColor: surface }} visible={isMessageActive} onDismiss={() => setIsMessageActive(false)}>
          <Dialog.Content>
            <Text style={{ color: text }}>{ message }</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button labelStyle={{ color: main }} onPress={() => setIsMessageActive(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog style={{ backgroundColor: surface }} visible={isDeleteActive} onDismiss={() => isDeleteLoading ? () => {} : setIsDeleteActive(false)}>
          <Dialog.Title style={{ color: text }}>Excluir endereço</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{ color: text }}>Tem certeza que deseja excluir este endereço? Esta ação é irreversível.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button disabled={isDeleteLoading} labelStyle={{ color: main }} onPress={() => setIsDeleteActive(false)}>
              Cancelar
            </Button>
            <Button loading={isDeleteLoading} labelStyle={{ color: main }} onPress={handleDeleteAndress}>
              Sim, excluir
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <TouchableOpacity onPress={handleEditAndress} onLongPress={() => setIsDeleteActive(true)} activeOpacity={0.8} key={Math.random()} style={{ ...styles.container, backgroundColor: surface }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="map-marker-outline" type="material-community" color={text} />
          <Text numberOfLines={1} style={{ ...styles.title, color: text }}>{ name }</Text>
        </View>
        <Text numberOfLines={1} style={{ color: text, fontSize: 14 }}>{ `${street}, ${number} - ${neighborhood} - ${city} - ${state}` }</Text>
        { observation ? <Text numberOfLines={1} style={{ color: text, fontSize: 14 }}>{ `${observation}` }</Text> : <></> }
        <Text style={{ marginTop: 5, color: muted }}>Editar</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10, borderRadius: 4, padding: 15
  },
  title: {
    marginLeft: 5, fontFamily: 'Inter Medium', fontSize: 18
  }
});

export default AndressItem;