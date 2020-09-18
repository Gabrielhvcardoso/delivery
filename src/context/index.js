import React from 'react';
import { ShowcaseContextProvider } from './ShowcaseContext';

const ContextProvider = ({ children }) => {
  return (
    <ShowcaseContextProvider>
      { children }
    </ShowcaseContextProvider>
  );
}

export default ContextProvider;