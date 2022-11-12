import { Box } from "@mui/material";
import React from "react";

function PageNotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        margin: 4,
        padding: 2,
        backgroundColor: "rgba(200,200,200,0.6)",
        color: "#333",
      }}
    >
      Requested page does not exit, try selecting tabs to navigate between
      pages.
    </Box>
  );
}

export default PageNotFound;
