import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';

import Option from './Option';
import { Header } from './styles';

const Options = ({ options, initialPrice }) => {

  if (!options) return <View />;

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