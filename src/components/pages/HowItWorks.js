import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

function HowItWorks() {
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
            This app uses a{" "}
            <a href="https://github.com/Donaldcwl/browser-image-compression">
              javascript module
            </a>{" "}
            which runs in web browsers to compress images.
          </div>
          <div>
            for better performance multi-threading is enabled by default.(web
            workers)
          </div>
          <div>UI implemented using React JS and material UI</div>
        </CardContent>
      </Card>
    </Box>
  );
}

export default HowItWorks;
