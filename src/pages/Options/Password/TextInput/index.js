import React, { useContext } from 'react';
import { TextInput } from 'react-native-paper';
import ThemeContext from '../../../../context/ThemeContext';

function CustomTextInput ({ value, onChangeText, label }) {
  const { surface, muted, text } = useContext(ThemeContext);

  return (
    <TextInput
      style={{ backgroundColor: surface.hex(), color: text.hex() }}
      theme={{ colors: { text: text.hex(), label: text.hex(), placeholder: muted.hex() } }}
      value={value}
      onChangeText={onChangeText}
      label={label}
      placeholder="••••"
      secureTextEntry
    />
  );
}

export default CustomTextInput;
