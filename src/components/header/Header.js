import React, { useContext, useState } from "react";
import logo from "../../logo.png";
import Styles from "./Header.module.css";
import {
  Typography,
  AppBar,
  Toolbar,
  Tab,
  Tabs,
  useTheme,
  IconButton,
  useMediaQuery,
  Box,
} from "@mui/material";
import {
  Brightness7,
  Brightness4,
  Home,
  Help,
  Email,
  Menu,
  Close,
} from "@mui/icons-material";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const mobile = useMediaQuery("(max-width:600px)");

  const themeContext = useContext(ThemeContext);
  const urlParam = window.location.href.split("/").pop();
  const [selectedTab, setselectedTab] = useState(
    urlParam === "contact" ? 2 : urlParam === "how-it-works" ? 1 : 0
  );
  const [openMenu, setOpenMenu] = useState(false);
  function tabChangeHandler(event, value) {
    setselectedTab(value);
  }

  return (
    <AppBar position="relative">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: !openMenu ? "row-reverse" : "column",
            // flexDirection: mobile ? "column" : "row-reverse",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h6">Picompressor</Typography>
          <img
            alt="logo"
            className={
              openMenu && mobile
                ? Styles.header__logo__large
                : Styles.header__logo
            }
            src={logo}
          />
        </Box>
        {mobile && !openMenu ? (
          <IconButton
            sx={{
              marginLeft: "auto",
            }}
            color="secondary"
            onClick={() => {
              setOpenMenu(true);
            }}
          >
            <Menu />
          </IconButton>
        ) : (
          <Tabs
            variant="scrollable"
            orientation={openMenu ? "vertical" : "horizontal"}
            textColor="inherit"
            sx={{ margin: "auto" }}
            value={selectedTab}
            onChange={tabChangeHandler}
            indicatorColor="secondary"
          >
            <Tab
              sx={{
                textTransform: "none",
              }}
              icon={<Home />}
              label="Home"
              component={Link}
              to="/"
            />
            <Tab
              sx={{
                textTransform: "none",
              }}
              icon={<Help />}
              label="How it works"
              component={Link}
              to="how-it-works"
            />
            <Tab
              sx={{
                textTransform: "none",
              }}
              icon={<Email />}
              label="Contact me"
              component={Link}
              to="contact"
            />
          </Tabs>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {mobile && openMenu && (
            <IconButton
              color="secondary"
              onClick={() => {
                setOpenMenu(false);
              }}
            >
              <Close />
            </IconButton>
          )}
          <IconButton color="secondary" onClick={themeContext.changeTheme}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
