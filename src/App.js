import "./App.css";
import { useContext } from "react";
import { ThemeContext } from "./components/context/ThemeContext";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import Header from "./components/header/Header";
import Main from "./components/Main";
import { Route, Routes } from "react-router-dom";
import HowItWorks from "./components/pages/HowItWorks";
import Contact from "./components/pages/Contact";
import PageNotFound from "./components/pages/PageNotFound";

function App() {
  const themeContext = useContext(ThemeContext);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  let mode = themeContext.mode;
  if (prefersDarkMode) {
    mode = "dark";
  }
  const colors = {
    green1: "#dcf8c6", // lightest
    green2: "#25d366",
    green3: "#128c7e",
    green4: "#075e54", // darkest
    errorRed: "#d32f2f",
  };
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: { main: colors.green1 },
            secondary: { main: colors.green3 },
            // divider: "#BB1111",
            text: {
              primary: colors.green4,
              secondary: colors.green3,
            },
            action: {
              // active,hover,selected,...
              active: colors.green1,
              hover: colors.green3,
              selected: colors.green2,
            },
            background: {
              // default, paper
            },
          }
        : {
            // palette values for dark mode
            primary: { main: colors.green3 }, //buttons background color
            secondary: { main: colors.green1 },
            error: { main: colors.errorRed },
            background: {
              default: colors.green4,
              paper: colors.green4,
            },
            text: {
              primary: colors.green1,
              secondary: colors.green3,
            },
            action: {
              // active,hover,selected,...
              active: colors.green3,
              hover: colors.green1,
              selected: colors.green2,
            },
          }),
    },
    typography: {
      fontFamily: `"Arvo", serif`,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/how-it-works" element={<HowItWorks />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        {/* <Main /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
