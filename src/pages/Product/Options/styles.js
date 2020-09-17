import React from 'react';
import styled from 'styled-components';
import Options from '.';

export const Header = ({ required, title }) => {
  return (
    <HeaderContainer>
      <HeaderText>
        { required ? '* ' : '' }
        { title }
      </HeaderText>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.View`
  align-items: flex-start;
  background-color: #f2f2f2;
  height: 50px;
  justify-content: center;
  margin-top: 15px;
  padding: 0px 20px;
`;

const HeaderText = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

export const Option = ({ option }) => (
  <OptionContainer>
    <OptionText>
      { option.name }
    </OptionText>
    <OptionText>
      {
        option.addValue ? (
          `R$ ${option.addValue.toFixed(2).toString().replace('.', ',')}`
        ) : '-'
      }
    </OptionText>
  </OptionContainer>
);

const OptionContainer = styled.View`
  align-items: center;
  flex-direction: row;
  height: 70px;
  justify-content: space-between;
  padding: 0px 20px;
`;

const OptionText = styled.Text`

`;
