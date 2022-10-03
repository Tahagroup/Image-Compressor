import "./App.css";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { createTheme, ThemeProvider } from "@mui/material";
import Header from "./components/header/Header";
import Main from "./components/Main";

function App() {
  const themeContext = useContext(ThemeContext);
  const theme = createTheme({
    palette: { mode: themeContext.mode },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
