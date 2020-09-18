import React from 'react';
import Showcase from '../components/Showcase';

import { ShowcaseContextProvider } from './ShowcaseContext';

const ContextProvider = ({ children }) => {
  return (
    <ShowcaseContextProvider>
      <Showcase />
      { children }
    </ShowcaseContextProvider>
  );
}

export default ContextProvider;