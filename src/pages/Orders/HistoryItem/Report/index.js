import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, HelperText, Modal, Portal, Text, TextInput } from 'react-native-paper';

import ClientContext from '../../../../context/ClientContext';
import ThemeContext from '../../../../context/ThemeContext';
import { useFetch } from '../../../../hooks/useFetch';

const Report = ({ orderId, visible, onDismiss }) => {
  const { isOpen } = useContext(ClientContext);
  const { danger, main, muted, surface, text: textColor } = useContext(ThemeContext);
  
  const [text, setText] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) setIsError(false)
  }, [text]);

  const handleReport = () => {
    if (text.length < 20) return setIsError(true);

    useFetch.post("/p/report/order", {
      orderId, report: text
    }, (response) => {
      if (response.code === 'success') {
        Alert.alert(
          "Mensagem enviada",
          isOpen ? "Obrigado pelo feedback, logo estaremos entrando em contato" : "Sua resposta pode demorar um pouco pois o estabelecimento está fechado atualmente.",
          [{ text: "Ok", onPress: () => {
            setText("");
            onDismiss();
          } }]);
      } else {
        onDismiss();
      }
    })
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ ...styles.containerStyle, backgroundColor: surface.hex() }}>
        <Text style={{ fontSize: 20, color: textColor.hex() }}>Reportar pedido</Text>
        <Text style={{ color: textColor.hex() }}>Descreva qual problema você teve com este pedido.</Text>

        <TextInput
          autoFocus
          autoCorrect
          maxLength={255}
          mode="outlined"
          error={isError}
          multiline
          numberOfLines={5}
          onChangeText={(e) => setText(e)}
          placeholder="Descreva aqui..."
          style={{ backgroundColor: surface.hex(), color: textColor.hex(), ...styles.textinput }}
          theme={{ colors: { text: textColor.hex(), label: textColor.hex(), placeholder: muted.hex(), primary: muted.hex() } }}
          value={text}
        />
        <HelperText style={{ color: textColor.hex(), alignSelf: 'flex-end' }}>{ text.length } / 255</HelperText>
        <HelperText visible={isError} style={{ color: danger.hex() }}>Escreva pelo menos 20 caracteres.</HelperText>
        <HelperText style={{ color: textColor.hex() }}>Suas informações de contato e detalhes do seu pedido serão reenviados para o restaurante para que possamos resolver seu problema.</HelperText>
        
        <Button
          onPress={handleReport}
          style={{ marginTop: 10 }}
          color={main.hex()}
        >
          Enviar
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    margin: 20,
    padding: 20
  },
  textinput: {
    marginTop: 20,
  }
})

export default Report;
