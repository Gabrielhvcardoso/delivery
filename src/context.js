import React, { createContext, useState } from 'react';

const GeneralContext = createContext({
  showcaseImage: null,
  showImage: () => {},

  isShowcaseVisible: false,
  dismissShowcase: () => {}
});

export const GeneralContextProvider = ({ children }) => {
  const [isShowcaseVisible, setIsShowcaseVisible] = useState(false);
  const [showcaseImage, setShowcaseImage] = useState("");

  const showImage = (image) => {
    setShowcaseImage(image);
    setIsShowcaseVisible(true);
  }

  return (
    <GeneralContext.Provider value={{
      showcaseImage,
      showImage,
      isShowcaseVisible,
      dismissShowcase: () => setIsShowcaseVisible(false)
    }}>
      { children }
    </GeneralContext.Provider>
  );
}

export default GeneralContext;
