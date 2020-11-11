import React, { createContext, useMemo, useState } from 'react';
import Color from 'color';

const ThemeContext = createContext({
  danger: null,
  main: null,
  mode: null,
  background: null,
  muted: null,
  soft: null,
  surface: null,
  text: null,

  setMainColor: (hex) => {},
  setThemeVariant: (variant) => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [mainColor, setMainColor] = useState("#0088FF");
  const [themeVariant, setThemeVariant] = useState("light");

  const theme = useMemo(() => ({
    main:       Color(mainColor),
    mode:       themeVariant,
    background: themeVariant === "light" ? Color("#F2F2F2") : Color("#000000"),
    muted:      themeVariant === "light" ? Color("#666666") : Color("#999999"),
    soft:       themeVariant === "light" ? Color("#DDDDDD") : Color("#444444"),
    surface:    themeVariant === "light" ? Color("#FFFFFF") : Color("#222222"),
    text:       themeVariant === "light" ? Color("#222222") : Color("#F2F2F2"),
    danger: Color("#FF0000"),

    setMainColor,
    setThemeVariant,
  }), [themeVariant, mainColor]);

  return (
    <ThemeContext.Provider value={theme}>
      { children }
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
