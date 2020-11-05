import React, { useContext } from 'react';
import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ThemeContext from '../../../context/ThemeContext';

/*
  Use useCopyToClipboard to copy these contact numbers/email andresses
*/

export default function Contact () {
  const { background, surface, text } = useContext(ThemeContext);

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
    }
  ]

  return (
    <ScrollView style={{ ...styles.container, backgroundColor: background.hex() }}>
      {
        data.map(({ title, contacts }) => (
          <View key={title} style={{ ...styles.box, backgroundColor: surface.hex(), }}>
            <Text style={{ ...styles.title, color: text.hex() }}>{ title }</Text>
            {
              contacts.map((contact) => (
                <TouchableOpacity key={contact} style={{ ...styles.contact, backgroundColor: background.hex() }}>
                  <Text style={{ color: text.hex() }}>{ contact }</Text>
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
    padding: 20
  },

  contact: {
    borderRadius: 8,
    marginTop: 8,
    paddingHorizontal: 17,
    paddingVertical: 7
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
