import React from 'react';
import { Modal, ScrollView, TextInput } from 'react-native';

// import { Container } from './styles';

const Search = ({ visible, onDismiss }) => {
  return (
    <Modal visible={visible} onRequestClose={onDismiss} transparent animationType={'slide'}>
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentContainerStyle={{ padding: 15 }}>
 
      </ScrollView>
    </Modal>
  );
}

export default Search;