import { useNavigation } from '@react-navigation/native';
import React, { useContext, useMemo, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import ThemeContext from '../../../context/ThemeContext';

import Product from '../../Category/Product';

const Search = ({ categories, visible, onDismiss }) => {
  const navigation = useNavigation();

  const { muted } = useContext(ThemeContext);

  const [search, setSearch] = useState("");
  const suggestions = useMemo(() => categories.flatMap(item => item.products), [categories]);


  const filteredCategories = useMemo(() => {
    const regex = new RegExp(search, 'i');
    return categories.filter(({ name }) => regex.test(name));
  }, [search]);

  const filteredProducts = useMemo(() => {
    const regex = new RegExp(search, 'i');
    return suggestions.filter(({ name }) => regex.test(name))
  }, [search]);

  return (
    <Modal visible={visible} onRequestClose={onDismiss} transparent animationType={'slide'}>
      <ScrollView removeClippedSubviews style={{ flex: 1, backgroundColor: 'white' }}>
        <TextInput
          autoFocus
          value={search} onChangeText={(t) => setSearch(t)}
          style={styles.textinput} placeholder="Pesquise categorias, produtos"
        />
        <View>
          <View>
          <Text style={{ marginHorizontal: 20, marginBottom: 10, fontSize: 17, fontFamily: 'Inter Medium' }}>Categorias</Text>
            <ScrollView removeClippedSubviews horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
              {
                filteredCategories.map(item => (
                  <TouchableOpacity
                    style={{ flex: 1, marginBottom: 20 }}
                    key={Math.random() * Math.random()}
                    onPress={() => {
                      onDismiss();
                      navigation.navigate("Category", { category: item });
                    }}
                  >
                  <View>
                      <Image
                        style={{ flex: 1, height: 100, width: 120, marginHorizontal: 5, borderRadius: 10 }}
                        source={{ uri: item.image }}
                      />
                      <Text numberOfLines={1} style={{ textAlign: 'center', width: 120, marginLeft: 5, marginRight: 5, fontSize: 14, marginTop: 7, color: muted, fontFamily: 'Inter Medium' }}>
                        { item.name }
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          </View>

          <View style={{ margin: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 17, fontFamily: 'Inter Medium' }}>Produtos</Text>
            {
              filteredProducts.map((item) => (
                <Product onClick={onDismiss} product={item} key={Math.random()} />
              ))
            }
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textinput: {
    backgroundColor: '#eee',

    height: 50,
    fontFamily: 'Inter Regular',
    fontSize: 17,

    margin: 20,
    paddingHorizontal: 20
  }
})

export default Search;
