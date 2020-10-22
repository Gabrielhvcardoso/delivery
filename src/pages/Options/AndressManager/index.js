import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import styled from 'styled-components';

import ThemeContext from '../../../context/ThemeContext';
import AuthContext from '../../../context/AuthContext';

import { useFetch } from '../../../hooks/useFetch';

import AndressItem from './AndressItem';
const Text = styled.Text`
  font-family: Inter Regular;
`;

const AndressManager = ({ navigation }) => {
  const { background, main, text } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);

  const { user, setUser } = useContext(AuthContext);
  const [andress, setAndress] = useState({})
  
  useEffect(() => {
    if (user.andress) {
      setAndress(user.andress);
      setIsLoading(false);
    }
  }, [user.andress]);

  const handleCreateAndress = () => {
    navigation.navigate('AndressSelector', { 
      goBack: (data, onEnd) => {
        useFetch.post('/p/u/a/create', { userId: user.userId, andress: JSON.stringify(data) }, (response) => {
          if (response.code) {
            alert('Ocorreu algum erro, por favor, tente novamente.');
            return onEnd(false);
          }
    
          const newUserAndressArr = andress[0] ? andress : [];
          newUserAndressArr.push({ andressId: response.id, andress: JSON.stringify(data) });
          setUser({...user, andress: newUserAndressArr });
          onEnd(true);
        })
      }
    });
  }

  const handleRemoveAndress = (id) => {
    setUser({
      ...user,
      andress: user.andress.filter(item => item.andressId !== id),
    });
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={main} />
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: background }} contentContainerStyle={{ padding: 15 }}>
      {
        andress
          ? andress[0]
            ? andress.map(item => (
              <AndressItem andress={andress} setAndress={setAndress} removeItem={handleRemoveAndress} key={item.andressId} item={item} />
            ))
            : <></>
          : <></>
        }

      <TouchableOpacity onPress={handleCreateAndress} activeOpacity={0.8} style={{ ...styles.addNewContainer, backgroundColor: main }}>
        <Text numberOfLines={1} style={{ ...styles.label, color: text.negate() }}>Adicionar endereço</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addNewContainer: {
    marginTop: 10, borderRadius: 4, padding: 15,
  },
  label: {
    alignSelf: 'center', fontSize: 18
  }
});

export default AndressManager;