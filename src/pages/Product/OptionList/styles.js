import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

export const Header = ({ required, unique, title }) => {
  return (
    <HeaderContainer>
      <HeaderText>
        { title }
      </HeaderText>
      <View style={{ flexDirection: 'row' }}>
        {
          unique ? (
          <HeaderBadge>
            Único
          </HeaderBadge>
          ) : <></>
        }

        { required ? (
          <HeaderBadge>
            Obrigatório
          </HeaderBadge>
        ) : <></> }
      </View>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.View`
  align-items: center;
  background-color: #f2f2f2;
  flex-direction: row;
  height: 50px;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0px 20px;
`;

const HeaderText = styled.Text`
  color: #333;
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
