import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemeContexProvider from "./components/context/ThemeContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContexProvider>
        <App />
      </ThemeContexProvider>
    </BrowserRouter>
  </React.StrictMode>
);
