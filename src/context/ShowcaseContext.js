import React, { createContext, useState } from 'react';
import Showcase from '../components/Showcase';

const ShowcaseContext = createContext({
  // Showcase functions and states

  showcaseImage: null,
  showImage: () => {},
  isShowcaseVisible: false,
  dismissShowcase: () => {},
});

export const ShowcaseContextProvider = ({ children }) => {
  const [isShowcaseVisible, setIsShowcaseVisible] = useState(false);
  const [showcaseImage, setShowcaseImage] = useState("");

  const showImage = (image) => {
    setShowcaseImage(image);
    setIsShowcaseVisible(true);
  }

  return (
    <ShowcaseContext.Provider value={{
      showcaseImage,
      showImage,
      isShowcaseVisible,
      dismissShowcase: () => setIsShowcaseVisible(false)
    }}>
      <Showcase />
      { children }
    </ShowcaseContext.Provider>
  );
}

export default ShowcaseContext;
