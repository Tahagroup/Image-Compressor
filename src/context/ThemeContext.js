import React, { useState } from "react";
// data of context, can be strings, number, an object etc. example:
// This is just a blueprint, can be empty but helps with vscode suggestion!(the definition in provider is important)
export const ThemeContext = React.createContext({
  mode: "",
  changeTheme: () => {},
});
//////////////////////////////////////////////////////////////
// This is the component that should be wrapped around mother of all context-needers!
// when context changes this component and all child components will be re-rendered with new data.
const ThemeContexProvider = (props) => {
  // Initial state and function declarations will be here:
  const [mode, setMode] = useState("light");
  const changeThemeHandler = () => {
    setMode((prevTheme) => {
      return prevTheme === "light" ? "dark" : "light";
    });
  };
  return (
    <ThemeContext.Provider
      value={{
        // This is where actual context data needs to be provided:
        //mode:mode is equal to mode!
        mode,
        changeTheme: changeThemeHandler,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeContexProvider;
