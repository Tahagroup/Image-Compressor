import React, { useContext, useState } from "react";
// import styles from "../components/Header.module.css";
import {
  Typography,
  AppBar,
  Toolbar,
  Tab,
  // LinkTab,
  Tabs,
  useTheme,
} from "@mui/material";
import { Brightness7, Brightness4 } from "@mui/icons-material";
import { ThemeContext } from "../../context/ThemeContext";

const Header = () => {
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const [selectedTab, setselectedTab] = useState(0);
  function tabChangeHandler(event, value) {
    setselectedTab(value);
  }
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6">Image Compressor</Typography>
        <Tabs
          textColor="inherit"
          sx={{ marginLeft: "auto" }}
          value={selectedTab}
          onChange={tabChangeHandler}
          centered
        >
          <LinkTab label="Home" href="/" />
          <LinkTab label="How it works" href="/guide" />
          <LinkTab label="Contact me" href="/contact" />
          <Tab
            icon={
              theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />
            }
            onClick={themeContext.changeTheme}
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

function LinkTab(props) {
  // This component's job is to prevent the browser default of restarting
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
