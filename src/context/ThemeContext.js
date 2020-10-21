import React, { createContext } from 'react';
import Color from 'color';

const ThemeContext = createContext({
  main: null
});

export const ThemeContextProvider = ({ children }) => {
  const theme = {
    mode: 'light',
    background: Color("#F2F2F2"),
    main: Color("#0088FF"),
    muted: Color("#666666"),
    soft: Color("#CCCCCC"),
    surface: Color("#FFFFFF"),
    text: Color("#222222"),
  }

  const dark_theme = {
    mode: 'dark',
    background: Color("#000000"),
    main: Color("#ff7700"),
    muted: Color("#999999"),
    soft: Color("#444444"),
    surface: Color("#222222"),
    text: Color("#F2F2F2"),
  }

  return (
    <ThemeContext.Provider value={dark_theme}>
      { children }
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
