import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import AuthContext from '../../../context/AuthContext';

import { useFetch } from '../../../hooks/useFetch';

const Text = styled.Text`
  font-family: Inter Regular;
`;

const AndressManager = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser } = useContext(AuthContext);
  const [andress, setAndress] = useState({})
  
  useEffect(() => {
    if (user.andress) {
      setAndress(user.andress);
    }
  }, [user.andress])

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
        andress ? andress[0] ? andress.map(item => {
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
        }) : <></> : <></>
      }

      <TouchableOpacity
        onPress={() => navigation.navigate('AndressSelector', {
          goBack: (data, onEnd) => {
            const newAndress = JSON.stringify(data);


            useFetch.post('/p/u/a/create', { userId: user.userId, andress: newAndress }, (response) => {

              if (response.code) {
                alert('Ocorreu algum erro, por favor, tente novamente.');
                onEnd(false);
              }


                const newUserAndressArr = andress[0] ? andress : [];
                newUserAndressArr.push({ andressId: response.id, andress: JSON.stringify(data) });
                setUser({...user, andress: newUserAndressArr });
                onEnd(true);
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