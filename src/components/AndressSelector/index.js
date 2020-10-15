import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, View } from 'react-native';
import { TextInput } from './styles';

import cep from 'cep-promise';
import { Button } from 'react-native-paper';

export const cepMask = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1')
}

const AndressSelector = ({ navigation, route }) => {
  const [andress, setAndress] = useState({ name: '', cep: '', state: '', city: '', street: '', neighborhood: '', number: '', observation: '' });
  const onChange = (field, value) => field === 'cep' ? setAndress({ ...andress, [field]: cepMask(value) }) : setAndress({ ...andress, [field]: value });

  const { goBack } = route.params;
  if (!goBack) navigation.goBack();

  useEffect(() => {
    if (andress.cep.length === 10) {
      cep(andress.cep.replace(['.', '-'], ''))
        .then((newAndress) => {
          if (newAndress.cep) {
            setAndress({ cep: cepMask(newAndress.cep), ...andress, ...newAndress })
          }
        });
    } 
  }, [andress.cep]);

  return (
    <View style={{ flex: 1, padding: 15, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" />

      {
        [
          { field: 'name', label: 'Nome* (ex.: casa, trabalho)' },
          { field: 'cep', label: 'CEP*', keyboardType: 'number-pad' },
          { field: 'neighborhood', label: 'Bairro*' },
          { field: 'street', label: 'Rua*' },
          { field: 'number', label: 'Número*' },
          { field: 'observation', label: 'Complemento / observação' },
          { field: 'city', label: 'Cidade*' },
          { field: 'state', label: 'Estado*' },
        ].map(item => (
          <TextInput
            key={item.field}
            placeholder={item.label}
            value={andress[item.field]}
            onChangeText={value => onChange(item.field, value)}
            keyboardType={item.keyboardType ?? 'default'}
          />
        ))
      }

      <View style={{ flex: 1, justifyContent: 'flex-end' }} />
      <Button
        mode="contained"
        onPress={() => {
          if (andress.name === '' || andress.cep === '' || andress.state === '' || andress.city === '' || andress.street === '' || andress.neighborhood === '' || andress.number === '') {
            return Alert.alert('Atenção', 'Preencha todos os campos obrigatórios', [{ text: 'Ok' }]);
          }

          delete andress.service;
          navigation.goBack();
          goBack(andress);
        }}
        contentStyle={{ height: 60 }}
      >Salvar</Button>
    </View>
  );
}

export default AndressSelector;