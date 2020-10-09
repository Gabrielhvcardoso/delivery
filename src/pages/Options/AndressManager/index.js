import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import AuthContext from '../../../context/AuthContext';

import { useFetch } from '../../../hooks/useFetch';

const Text = styled.Text`
  font-family: Inter Regular;
`;

const AndressManager = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { user, setUser } = useContext(AuthContext);
  const { andress } = user;

  console.log(andress)

  useEffect(() => {
    if (andress[0]) {
      setIsLoading(false);
    } else {
      navigation.navigate('AndressSelector');
    }
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }} contentContainerStyle={{ padding: 15 }}>
      {
        andress[0].andress ? andress.map(item => {
          const {
            name, number, observation, cep, state, city, neighborhood, street
          } = JSON.parse(item.andress);
          
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('AndressSelector', {
                andress: item.andress,
                goBack: (data) => {

                  const newAndress = {
                    andressId: item.andressId,
                    andress: JSON.stringify(data)
                  };

                  useFetch.post('/p/u/a/update', newAndress, (response) => {

                    if (response.code === 'error') {
                      alert('Error')
                    } else {
                      const newUserAndressArr = andress;
                      const index = andress.findIndex(obj => obj.andressId === item.andressId);
                      newUserAndressArr[index] = ({ andressId: item.andressId, andress: data });

                      setUser({...user, andress: newUserAndressArr });
                    }
                  })
                }
              })}
              activeOpacity={0.8}
              key={Math.random()}
              style={{ marginTop: 10, borderRadius: 4, elevation: 3, padding: 15, backgroundColor: 'white' }}
            >
              <Text numberOfLines={1} style={{ fontSize: 18 }}>{ name }</Text>
              <Text numberOfLines={1} style={{ fontSize: 14 }}>{ `${street}, ${number} - ${cep} - ${city}-${state}` }</Text>
              <Text style={{ marginTop: 5, color: 'grey' }}>Editar</Text>
            </TouchableOpacity>
          );
        }) : <></>
      }

      <TouchableOpacity
        onPress={() => navigation.navigate('AndressSelector', {
          goBack: (data) => {

            const newAndress = JSON.stringify(data);

            useFetch.post('/p/u/a/create', { userId: user.userId, andress: newAndress }, (response) => {

              if (response.code) {
                alert('Error')
              } else {
                navigation.goBack();

                const newUserAndressArr = andress;
                newUserAndressArr.push({ andressId: response.id, andress: JSON.stringify(data) });

                setUser({...user, andress: newUserAndressArr });
              }
            })
          }
        })}
        activeOpacity={0.8}
        key={Math.random()}
        style={{ marginTop: 10, borderRadius: 4, elevation: 3, padding: 15, backgroundColor: 'white' }}
      >
        <Text numberOfLines={1} style={{ fontSize: 18 }}>Adicionar endereço</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default AndressManager;