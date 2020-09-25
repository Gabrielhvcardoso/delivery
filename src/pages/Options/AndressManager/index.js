import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import AuthContext from '../../../context/AuthContext';

import { useFetch } from '../../../hooks/useFetch';

const AndressManager = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { user, setUser } = useContext(AuthContext);
  const { andress } = user;

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
        andress.map(item => (
          <TouchableOpacity
            onPress={() => navigation.navigate('AndressSelector', {
              latitude: item.latitude,
              longitude: item.longitude,
              goBack: (data) => {

                const newAndress = {
                  andressId: item.andressId,
                  ...data
                };

                useFetch.post('/p/u/a/update', newAndress, (response) => {

                  if (response.code === 'error') {
                    alert('Error')
                  } else {
                    const newUserAndressArr = andress;
                    const index = andress.findIndex(obj => obj.andressId === item.andressId);
                    newUserAndressArr[index] = ({ andressId: item.andressId, ...data});

                    setUser({...user, andress: newUserAndressArr });
                  }
                })
              }
            })}
            activeOpacity={0.8}
            key={Math.random()}
            style={{ marginTop: 10, borderRadius: 4, elevation: 3, padding: 15, backgroundColor: 'white' }}
          >
            <Text numberOfLines={1} style={{ fontSize: 18 }}>{ item.andress }</Text>
            <Text style={{ marginTop: 5, color: 'grey' }}>Editar</Text>
          </TouchableOpacity>
        ))
      }
    </ScrollView>
  );
}

export default AndressManager;