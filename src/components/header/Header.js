import React, { useContext, useState } from "react";
// import styles from "../components/Header.module.css";
import {
  Typography,
  AppBar,
  Toolbar,
  Tab,
  Tabs,
  useTheme,
  IconButton,
} from "@mui/material";
import {
  Brightness7,
  Brightness4,
  Home,
  Help,
  Email,
} from "@mui/icons-material";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

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
          indicatorColor="secondary"
          centered
          style={{
            margin: "auto",
          }}
        >
          <Tab icon={<Home />} label="Home" component={Link} to="/" />
          <Tab
            icon={<Help />}
            label="How it works"
            component={Link}
            to="how-it-works"
          />
          <Tab
            icon={<Email />}
            label="Contact me"
            component={Link}
            to="contact"
          />
        </Tabs>
        <IconButton onClick={themeContext.changeTheme}>
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

function LinkTab(props) {
  // This component's job is to prevent the browser default of reloading the page
  return (
    <Tab
      component={Link}
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
