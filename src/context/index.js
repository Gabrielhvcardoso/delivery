import React from 'react';
import Showcase from '../components/Showcase';
import Basket from '../components/Basket';

import { AuthContextProvider } from './AuthContext';
import { ShowcaseContextProvider } from './ShowcaseContext';
import { BasketContextProvider } from './BasketContext';
import { FavoriteContextProvider } from './FavoriteContext';

const ContextProvider = ({ children }) => {
  return (
    <AuthContextProvider>
      <FavoriteContextProvider>
        <BasketContextProvider>
          <Basket />

          <ShowcaseContextProvider>
            <Showcase />

              { children }
          </ShowcaseContextProvider>
        </BasketContextProvider>
      </FavoriteContextProvider>
    </AuthContextProvider>
  );
}

export default ContextProvider;