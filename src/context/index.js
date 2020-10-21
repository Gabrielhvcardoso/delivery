import React from 'react';
import Showcase from '../components/Showcase';
import Basket from '../components/Basket';

import { AuthContextProvider } from './AuthContext';
import { ShowcaseContextProvider } from './ShowcaseContext';
import { BasketContextProvider } from './BasketContext';
import { FavoriteContextProvider } from './FavoriteContext';
import { ThemeContextProvider } from './ThemeContext';

const ContextProvider = ({ children }) => {
  return (
    <ThemeContextProvider>
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
    </ThemeContextProvider>
  );
}

export default ContextProvider;