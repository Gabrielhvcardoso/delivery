import React, { useContext, useMemo } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import ThemeContext from '../../../context/ThemeContext';
import ProductContext from '../context';

export const Header = ({ max, options: array, required, unique, title }) => {
  const { mode, soft, surface, text } = useContext(ThemeContext);
  const { options } = useContext(ProductContext);

  const optionsContextCounter = useMemo(() => {
    // Verify how much options from this group has inside context options
    let howMuch = 0;

    array.forEach(element => {
      if (options.some(item => item.name === element.name)) howMuch++;
    });

    return howMuch;
  }, [options, array]);


  return (
    <HeaderContainer style={{ backgroundColor: mode === 'light' ? surface : soft }}>
      <HeaderText style={{ color: text }}>
        { title }
      </HeaderText>
      <View style={{ flexDirection: 'row' }}>
        {
          max ? (
            <HeaderBadge style={{ backgroundColor: text, color: text.negate() }}>
              {optionsContextCounter} / {max}
            </HeaderBadge>
          ) : <></>
        }

        {
          unique ? (
          <HeaderBadge style={{ backgroundColor: text, color: text.negate() }}>
            Único
          </HeaderBadge>
          ) : <></>
        }

        { required ? (
          <HeaderBadge style={{ backgroundColor: text, color: text.negate() }}>
            Obrigatório
          </HeaderBadge>
        ) : <></> }
      </View>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.View`
  align-items: center;
  flex-direction: row;
  height: 50px;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0px 20px;
`;

const HeaderText = styled.Text`
  font-size: 16px;
  font-family: Inter Bold;
`;

const HeaderBadge = styled.Text`
  color: #fff;
  background-color: #333;
  border-radius: 20px;
  font-size: 12px;
  font-family: Inter Regular;
  margin-left: 3px;
  padding: 2px 9px;
`;
