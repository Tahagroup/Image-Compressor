import { Box, Card, CardContent, useTheme } from "@mui/material";
import React from "react";

function Contact() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        margin: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          margin: "50px",
          borderRadius: "12px",
          maxWidth: "720px",
          backgroundColor: `${theme.palette.primary.light}`,
        }}
      >
        <CardContent
          sx={{
            "& > div": {
              margin: "18px",
            },
          }}
        >
          <div>
            You can reach me via:{" "}
            <a href="mailto: y.basiri@yahoo.com">y.basiri@yahoo.com</a>
          </div>
          <div>Show support to this project by giving it a star on github!</div>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Contact;
