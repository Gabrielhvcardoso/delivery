import React from 'react';
import Showcase from '../components/Showcase';
import Basket from '../components/Basket';

import { AuthContextProvider } from './AuthContext';
import { ShowcaseContextProvider } from './ShowcaseContext';
import { BasketContextProvider } from './BasketContext';

const ContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <BasketContextProvider>
        <Basket />

        <ShowcaseContextProvider>
          <Showcase />

            { children }
        </ShowcaseContextProvider>
      </BasketContextProvider>
    </AuthContextProvider>
  );
}

export default ContextProvider;