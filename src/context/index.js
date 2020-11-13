import React from 'react';
import Showcase from '../components/Showcase';
import Basket from '../components/Basket';

import { ClientContextProvider } from './ClientContext';
import { AuthContextProvider } from './AuthContext';
import { ShowcaseContextProvider } from './ShowcaseContext';
import { BasketContextProvider } from './BasketContext';
import { FavoriteContextProvider } from './FavoriteContext';
import { ThemeContextProvider } from './ThemeContext';

const ContextProvider = ({ children }) => {
  return (
    <ClientContextProvider>
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
    </ClientContextProvider>
  );
}

export default ContextProvider;