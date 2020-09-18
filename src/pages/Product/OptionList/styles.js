import React from 'react';
import styled from 'styled-components';

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
