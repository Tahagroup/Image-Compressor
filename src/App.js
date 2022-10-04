import "./App.css";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { createTheme, ThemeProvider } from "@mui/material";
import Header from "./components/header/Header";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const themeContext = useContext(ThemeContext);
  const theme = createTheme({
    palette: { mode: themeContext.mode },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/how-it-works" element={<div>How it works</div>}></Route>
          <Route path="/contact" element={<div>contact</div>}></Route>
          <Route path="*" element={<div>PageNotFound</div>}></Route>
        </Routes>
        {/* <Main /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
