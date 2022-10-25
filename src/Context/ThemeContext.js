import { createContext, useState } from "react";

export const CustomThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [customTheme, setCustomTheme] = useState({
    primaryColor: "#ff0000",
    secondaryColor: "#00ff00",
    tertiaryColor: "#0000ff",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    fontSize: "16px",
    fontFamily: "Monsterrat",
    headerColor: "white",
    headerText: 'light',
    headerLogo: 'digi_logo_white.png'
  });

  return (
    <CustomThemeContext.Provider value={{customTheme, setCustomTheme}}>
      {children}
    </CustomThemeContext.Provider>
  );
};
