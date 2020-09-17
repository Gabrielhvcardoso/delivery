import React, { useContext } from 'react';
import { Image as ReactNativeImage, TouchableOpacity } from 'react-native';

import GeneralContext from '../../context';

const Image = ({ uri, size = 'sm' }) => {
  const { showImage } = useContext(GeneralContext)
  
  // Criar valor default
  const image = uri;
  
  // Image size
  let vw = 100
  switch (size) {
    case 'xs': vw = 70;  break;
    case 'md': vw = 120; break;
    case 'lg': vw = 160; break;
    case 'xl': vw = 200; break;
    default:   vw = 100; break;
  }

  return (
    <TouchableOpacity
      style={{ borderRadius: vw/10, overflow: 'hidden' }}
      onPress={() => showImage(image)}  
    >
      <ReactNativeImage
        style={{ width: vw, height: vw }}
        source={{ uri: image }}
      />
    </TouchableOpacity>
  );
}

export default Image;