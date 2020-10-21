import React, { createContext } from 'react';
import Color from 'color';

const ThemeContext = createContext({
  main: null
});

export const ThemeContextProvider = ({ children }) => {
  const theme = {
    main: Color("#0088ff"),
  }

  return (
    <ThemeContext.Provider value={theme}>
      { children }
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
