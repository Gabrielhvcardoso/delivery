import React, { useContext } from 'react';
import { Clipboard, Text, ScrollView, StyleSheet, View, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ClientContext from '../../../context/ClientContext';
import ThemeContext from '../../../context/ThemeContext';

/*
  Use useCopyToClipboard to copy these contact numbers/email andresses
*/

export default function Contact () {
  const { andresses } = useContext(ClientContext);
  const { background, surface, muted, text } = useContext(ThemeContext);

  const onCopyCodeToClipboard = (code) => {
    Clipboard.setString(code);

    ToastAndroid.showWithGravity(
      "Copiado para área de transferência",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }
  
  return (
    <ScrollView removeClippedSubviews style={{ ...styles.container, backgroundColor: background.hex() }} contentContainerStyle={{ padding: 20 }}>
      {
        JSON.parse(andresses).map(({ title, contacts }) => (
          <View key={title} style={{ ...styles.box, backgroundColor: surface.hex(), }}>
            <Text style={{ ...styles.title, color: text.hex() }}>{ title }</Text>
            {
              contacts.map((contact) => (
                <TouchableOpacity onPress={() => onCopyCodeToClipboard(contact)} activeOpacity={0.7} key={contact} style={{ ...styles.contact, backgroundColor: background.hex() }}>
                  <Text style={{ color: text.hex() }}>{ contact }</Text>
                  <Text style={{ color: muted.hex(), fontSize: 11, textTransform: 'uppercase' }}>Copiar</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        ))
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contact: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 17,
    paddingVertical: 7,
  },

  box: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },

  title: {
    fontSize: 20,
    fontFamily: 'Inter SemiBold'
  }
})
