import styled from 'styled-components';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 15
  }
})`
  background-color: white;
`;

export const Section = styled.View`
  background-color: #f2f2f2;
  height: 100px;
  margin-top: 15px;
`;
