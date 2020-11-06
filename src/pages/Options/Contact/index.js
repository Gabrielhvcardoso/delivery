import React, { useContext } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ThemeContext from '../../../context/ThemeContext';

/*
  Use useCopyToClipboard to copy these contact numbers/email andresses
*/

export default function Contact () {
  const { background, surface, muted, text } = useContext(ThemeContext);

  const data = [
    {
      title: "Sede Jaraguá do Sul",
      contacts: [
        "example@example.com.br",
        "+55 47 99999 8888"
      ]
    }, {
      title: "Sede Guaramirim",
      contacts: [
        "example2@example.com.br",
        "+55 47 98888 7777",
        "+55 3300 0088"
      ]
    }, 
  ]

  return (
    <ScrollView removeClippedSubviews style={{ ...styles.container, backgroundColor: background.hex() }} contentContainerStyle={{ padding: 20 }}>
      {
        data.map(({ title, contacts }) => (
          <View key={title} style={{ ...styles.box, backgroundColor: surface.hex(), }}>
            <Text style={{ ...styles.title, color: text.hex() }}>{ title }</Text>
            {
              contacts.map((contact) => (
                <TouchableOpacity activeOpacity={0.7} key={contact} style={{ ...styles.contact, backgroundColor: background.hex() }}>
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
