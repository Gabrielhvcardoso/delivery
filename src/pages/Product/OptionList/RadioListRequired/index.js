import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import ProductContext from '../../context';

const RadioList = ({ options }) => {
  const [selected, setSelected] = useState(null);
  const { replaceOption, increaseOption } = useContext(ProductContext);

  const OptionContainer = styled.TouchableOpacity`
    background-color: ${props => selected === props.id ? '#fafafa' : 'white'}
    align-items: center;
    flex-direction: row;
    height: 70px;
    justify-content: space-between;
    padding: 0px 20px;
  `;

  const OptionText = styled.Text`
    font-family: ${props => selected === props.id ? 'Inter Bold' : 'Inter Regular'}
    color: ${props => selected === props.id ? '#0088ff' : 'black'};
  `;

  const alterSelected = (id) => {
    let index;

    if (selected !== null) {
      index = options.findIndex(item => item.optionItemId === selected);
      const { name: name1, addValue: price1 } = options[index];

      index = options.findIndex(item => item.optionItemId === id);
      const { name: name2, addValue: price2 } = options[index];
  
      replaceOption({ name: name1, price: price1 }, { name: name2, price: price2 });
      setSelected(id);
    } 
  
    else {
      index = options.findIndex(item => item.optionItemId === id);
      const { name, addValue: price } = options[index];

      increaseOption({ name, price });
      setSelected(id);
    }

    
  }

  useEffect(() => {
    alterSelected(options[0].optionItemId);
  }, []);

  return (
    <View>
      {
        options.map((item) => {
          const { addValue: price, name, optionItemId } = item;

          return (
            <OptionContainer
              onPress={() => alterSelected(optionItemId)}
              key={optionItemId}
              id={optionItemId}
            >
              <OptionText id={optionItemId}>
                { name }
              </OptionText>
              <OptionText>
                {
                  price ? (
                    `R$ ${price.toFixed(2).toString().replace('.', ',')}`
                  ) : '-'
                }
              </OptionText>
            </OptionContainer>
          );
        })
      }
    </View>
  );
}

export default RadioList;