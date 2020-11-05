import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import ProductContext from '../../context';
import ThemeContext from '../../../../context/ThemeContext';

export const Option = ({ max, array, option }) => {
  const { mode, main, surface, text } = useContext(ThemeContext);

  const [isSelected, setIsSelected] = useState(false);
  const { options, increaseOption, decreaseOption } = useContext(ProductContext);
  const { addValue: price, name } = option;

  const OptionContainer = styled.TouchableOpacity`
    background-color: ${isSelected ? mode === 'light' ? main.lighten(0.9) : main.darken(0.6) : surface }
    align-items: center;
    flex-direction: row;
    height: 70px;
    justify-content: space-between;
    padding: 0px 20px;
  `;

  const OptionText = styled.Text`
    font-family: ${isSelected ? 'Inter Bold' : 'Inter Regular'}
    color: ${isSelected ? mode === 'light' ? main : main : text};
  `;

  const optionsContextCounter = useMemo(() => {
    // Verify how much options from this group has inside context options
    let howMuch = 0;

    array.forEach(element => {
      if (options.some(item => item.name === element.name)) howMuch++;
    });

    return howMuch;
  }, [options, array]);

  useEffect(() => {
    if (isSelected) {
      if (max) {
        if (optionsContextCounter < max) {
          increaseOption({ name, price });  
        } else {
          setIsSelected(false);
        }
      } else {
        increaseOption({ name, price });
      }
    } else {
      decreaseOption({ name, price });
    }
  }, [isSelected])

  return (
    <OptionContainer
      isSelected={isSelected}
      onPress={() => {
        if (isSelected) {
          setIsSelected(!isSelected);
        } else {
          if (!max) {
            setIsSelected(!isSelected);
          } else {
            if (optionsContextCounter < max) {
              setIsSelected(!isSelected);
            }
          }
        }
      }}>
      <OptionText>
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
}

export default Option;
