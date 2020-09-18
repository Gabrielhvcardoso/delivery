import React from 'react';
import Showcase from '../components/Showcase';
import Basket from '../components/Basket';

import { ShowcaseContextProvider } from './ShowcaseContext';
import { BasketContextProvider } from './BasketContext';

const ContextProvider = ({ children }) => {
  return (
    <BasketContextProvider>
      <Basket />

      <ShowcaseContextProvider>
        <Showcase />

          { children }
      </ShowcaseContextProvider>
    </BasketContextProvider>
  );
}

export default ContextProvider;