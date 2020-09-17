import React from 'react';
import { View } from 'react-native';

import { Header, Option } from './styles';

const Options = ({ options }) => {
  return (
    <View>
      {
        options.map((option) => (
          <View key={Math.random()}>
            <Header required={option.required} title={option.title} />
            
            {
              option.options.map(suboption => (
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