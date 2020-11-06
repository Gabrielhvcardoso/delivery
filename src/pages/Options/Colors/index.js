import React, { useContext } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import ThemeContext from '../../../context/ThemeContext';

const Colors = () => {
  const { mode, background, main, muted, surface, soft, text, setThemeVariant, setMainColor } = useContext(ThemeContext);

  return (
    <ScrollView
      removeClippedSubviews
      style={{ flex: 1, backgroundColor: background }}
      contentContainerStyle={{ padding: 20 }}
    >
      <StatusBar barStyle={mode === "light" ? "dark-content" : "light-content"} />
      <View style={{ backgroundColor: surface, borderRadius: 10, padding: 15 }}>
      <Text style={{ ...styles.heading, color: text }}>Tema do aplicativo</Text>
      <View style={{ flexDirection: 'row', marginHorizontal: -3, marginBottom: 15 }}>
        {
          [
            { variant: 'light', title: "Tema claro", color: "#FFFFFF" },
            { variant: 'dark', title: "Tema Escuro", color: "#222222" },
          ].map(({ variant, title, color }) => (
            <TouchableOpacity
              onPress={() => setThemeVariant(variant)}
              style={{ ...styles.selector, backgroundColor: mode === variant ? main : soft, flexDirection: 'row' }}
              key={Math.random()}
            >
              <View style={{ ...styles.circle, backgroundColor: color }} />
              <Text style={{ color: mode === variant ? 'white' : text, marginLeft: 10, fontFamily: 'Inter Medium' }}>{ title }</Text>
            </TouchableOpacity>
          ))
        }
      </View>
      
      
      <Text style={{ ...styles.heading, color: text }}>Cor principal</Text>
        <View style={{ flexDirection: 'row', marginHorizontal: -3 }}>
          {
            [
              { color: '#0088FF', title: 'Azul' },
              { color: '#008000', title: 'Verde' },
              { color: '#FFCC00', title: 'Amarelo' },
              { color: '#FF7700', title: 'Laranja' },
              { color: '#FF0044', title: 'Vermelho' }
            ].map(({ color, title }) => (
              <TouchableOpacity
                onPress={() => setMainColor(color)}
                key={Math.random()}
                style={{ ...styles.selector, backgroundColor: main.hex() === color ? main : soft }}
              >
                <View style={{ ...styles.circle, backgroundColor: color, borderColor: 'white', borderWidth: main.hex() === color ? 1 : 0 }} />
                <Text style={{ ...styles.label, color: main.hex() === color ? 'white' : muted }}>{ title }</Text>
              </TouchableOpacity>
            ))
          }          
        </View>
      </View>

      <View style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="info-outline" size={14} color={muted.hex()} />
        <Text style={{ ...styles.label, marginLeft: 5, color: muted }}>
          Esta página não estará disponível na versão final do aplicativo, apenas no aplicativo de apresentação.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  selector: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    padding: 5,
    paddingVertical: 12,
    flex: 1
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'red'
  },
  heading: {
    fontFamily: 'Inter SemiBold',
    fontSize: 20,
    marginBottom: 10
  },
  label: {
    fontSize: 12,
    marginTop: 10
  }
});

export default Colors;