import React, { useState } from "react";
export const ThemeContext = React.createContext({
  mode: "",
  changeTheme: () => {},
});
//////////////////////////////////////////////////////////////

const ThemeContexProvider = (props) => {
  const [mode, setMode] = useState("light");
  const changeThemeHandler = () => {
    setMode((prevTheme) => {
      return prevTheme === "light" ? "dark" : "light";
    });
  };
  return (
    <ThemeContext.Provider
      value={{
        mode,
        changeTheme: changeThemeHandler,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeContexProvider;
