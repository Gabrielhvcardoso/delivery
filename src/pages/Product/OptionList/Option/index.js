import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductContext from '../../context';

export const Option = ({ option }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { increaseOption, decreaseOption } = useContext(ProductContext);
  const { addValue: price, name } = option;

  const OptionContainer = styled.TouchableOpacity`
    background-color: ${isSelected ? '#fafafa' : 'white'}
    align-items: center;
    flex-direction: row;
    height: 70px;
    justify-content: space-between;
    padding: 0px 20px;
  `;

  const OptionText = styled.Text`
    font-family: ${isSelected ? 'Inter Bold' : 'Inter Regular'}
    color: ${isSelected ? '#0088ff' : 'black'};
  `;

  useEffect(() => {
    if (isSelected) {
      increaseOption({ name, price });
    } else {
      decreaseOption({ name, price });
    }
  }, [isSelected])

  return (
    <OptionContainer isSelected={isSelected} onPress={() => setIsSelected(!isSelected)}>
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
