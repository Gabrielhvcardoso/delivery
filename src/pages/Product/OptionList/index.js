import React from 'react';
import { View } from 'react-native';
import { Header } from './styles';

import RadioListRequired from './RadioListRequired';
import RadioList from './RadioList';
import Option from './Option';

const Options = ({ options }) => {

  if (!options) return <View />;

  return (
    <View>
      {
        options.map((option) => (
          <View key={Math.random()}>
            <Header required={option.required} title={option.title} />
            {
              option.unique ?
                option.required ? (
                  <RadioListRequired options={option.options} />
                ) : (
                  <RadioList options={option.options} />
                )
               : option.options.map(suboption => (
                <Option option={suboption} key={Math.random()} />
              ))
            }
          </View>
        ))
      }
    </View>
  );
}

export default Options;