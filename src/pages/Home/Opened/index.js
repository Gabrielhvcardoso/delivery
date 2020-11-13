import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import ClientContext from '../../../context/ClientContext';
import ThemeContext from '../../../context/ThemeContext';

const Opened = () => {
  const { isOpen } = useContext(ClientContext);
  const { mode } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: mode === 'light' ? '#FFF3CD' : '#F5B83D',
      borderRadius: 10,
      flexDirection: 'row',
      marginBottom: 10,
      marginHorizontal: 20,
      padding: 20
    },
    text: {
      color: mode === 'light' ? '#93751B' : '#282C34',
      fontFamily: 'Inter Regular',
      fontSize: 18,
      marginLeft: 10
    }
  });

  if (isOpen) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <Icon name="alert-circle-outline" type="material-community" color={mode === 'light' ? '#93751B' : '#282C34'} />
      <Text style={styles.text}>A loja está fechada</Text>
    </View>
  );
}



export default Opened;
