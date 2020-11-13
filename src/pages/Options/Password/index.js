import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, HelperText, Paragraph, Portal } from 'react-native-paper';
import CustomTextInput from './TextInput';

import AuthContext from '../../../context/AuthContext';
import ThemeContext from '../../../context/ThemeContext';

import { useFetch } from '../../../hooks/useFetch';
import { ifHasPassword, ifHasntPassword } from './textinputdata';

const Password = ({ navigation, route }) => {
  const { user, setUser } = useContext(AuthContext);
  const { background, danger, main, text } = useContext(ThemeContext);

  const { secret, userId } = user;

  const { doesUserHasPassword } = route.params;
  
  const [dialogMessage, setDialogMessage] = useState(null);
  const [dialogTitle, setDialogTitle] = useState(null);

  const handleDialog = (title = null, message = null) => { setDialogTitle(title); setDialogMessage(message); }

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const onChange = (name, value) => { setForm({ ...form, [name]: value }); setErrors({}); }

  const handleValidation = () => {
    if (doesUserHasPassword && ( !form['current'] || form['current'] === "" )) setErrors({ ...errors, current: true });
    else if (!form['new'] || !form['new'].match(/[0-9]/g) || !form['new'].match(/[a-zA-Z]/g) || form['new'].length < 8 || form['new'].length > 20) setErrors({ ...errors, new: true });
    else if (form['new'] !== form['repeat']) setErrors({ ...errors, repeat: true });
    
    else {
      if (doesUserHasPassword && (form['current'] === form['new'])) {
        return handleDialog("Erro", "A senha atual e a nova são identicas.");
      }

      if (Object.keys(errors).length > 0) return false;

      let request = doesUserHasPassword
        ? { userId, currentPassword: form.current, newPassword: form.new }
        : { userId, password: form.new, secret };

      useFetch.post(doesUserHasPassword ? '/p/u/p/u' : '/p/u/p/c', request, (response) => {
        if (response.code === 'success') {
          handleDialog("Sucesso", doesUserHasPassword ? "Senha redefinida." : "Senha atribuída a sua conta.");
          setUser({ ...user, password: form.new });
          navigation.goBack(); 
        } else {
          switch (response.message) {
            case 'invalid current password':
              handleDialog("Erro", "A senha atual informada está incorreta.");
              break;

            default:
              handleDialog("Erro", "Algo de errado aconteceu...");
              break;
          }
        }
      });
    }
  }

  return (
    <View style={{ backgroundColor: background.hex(), ...styles.container }}>
      <Portal>
        <Dialog visible={Boolean(dialogMessage)} onDismiss={() => handleDialog()}>
          <Dialog.Title>{ dialogTitle }</Dialog.Title>
          <Dialog.Content><Paragraph>{ dialogMessage }</Paragraph></Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => handleDialog()}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View>
        {
          ( doesUserHasPassword ? ifHasPassword : ifHasntPassword ).map(({ key, label, error, help }) => (
            <View key={key}>
              <CustomTextInput key={key} value={form[key]} onChangeText={(e) => onChange(key, e)} label={label} />
              { error ? <HelperText visible={errors[key] ?? false} style={{ color: danger.hex() }}>{ error }</HelperText> : <></> }
              { help ? <HelperText style={{ color: errors[key] ? danger.hex() : text.hex() }}>{ help }</HelperText> : <></> }
            </View>
          ))
        }
      </View>

      <Button style={{ backgroundColor: main.hex() }} onPress={handleValidation} mode="contained">Confirmar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15, flex: 1, justifyContent: 'space-between'
  },
});

export default Password;
