import React from 'react';
import { StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import styled from 'styled-components';

export const Button = ({
  onPress = () => {}, 
  containerStyle = {},
  textStyle = {},
  mode = 'light',
  color = '#2b7ed7',
  icon,
  iconColor,
  children = 'example',
  disableElevation,
  disabled
}) => {
  return (
    <ButtonContainer disabled={disabled} disableElevation={disableElevation} style={containerStyle} onPress={onPress} color={color}>
      {
        icon ? (
          <Icon name={icon} type="material-community" color={iconColor ? iconColor : mode === 'light' ? 'white' : 'black'} />
        ) : (
          <ButtonText></ButtonText>
        )
      }
      <ButtonText style={textStyle} mode={mode}>
        { children }
      </ButtonText>

      <ButtonText></ButtonText>
    </ButtonContainer>
  );
}

const ButtonText = styled.Text`
  font-family: Inter Regular;
  font-size: 18px;
  color: ${props => props.mode === 'light' ? 'white' : 'black'};
`;

const ButtonContainer = styled.TouchableOpacity`
  height: 60px;
  background-color: ${props => props.color ?? '#2b7ed7'};
  align-items: center;
  flex-direction: row;
  elevation: ${ props => props.disableElevation ? '0' : '5'};
  justify-content: space-between;
  border-radius: 30px;
  margin-bottom: 10px;
  padding: 0px 30px;
`;

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  padding-top: ${StatusBar.currentHeight + 15 }px;
`;
