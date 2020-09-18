import React from 'react';
import Showcase from '../components/Showcase';

import { ShowcaseContextProvider } from './ShowcaseContext';
import { CartContextProvider } from './CartContext';

const ContextProvider = ({ children }) => {
  return (
    <ShowcaseContextProvider>
      <Showcase />

      <CartContextProvider>
        { children }
      </CartContextProvider>
    </ShowcaseContextProvider>
  );
}

export default ContextProvider;