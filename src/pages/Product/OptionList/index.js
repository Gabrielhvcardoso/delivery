import React from 'react';
import { View } from 'react-native';
import { Header } from './styles';

import RadioListRequired from './RadioListRequired';
import RadioList from './RadioList';
import Option from './Option';

const Options = ({ options }) => {

  console.log(options);

  if (!options) return <View />;

  return (
    <View>
      {
        options.map((option) => (
          <View key={Math.random()}>
            <Header max={option.maxItems} options={option.options} required={option.required} unique={option.unique} title={option.title} />
            {
              option.unique ?
                option.required ? (
                  <RadioListRequired options={option.options} />
                ) : (
                  <RadioList options={option.options} />
                )
               : option.options.map((suboption, index, array) => (
                <Option max={option.maxItems} array={array} option={suboption} key={Math.random()} />
              ))
            }
          </View>
        ))
      }
    </View>
  );
}

export default Options;