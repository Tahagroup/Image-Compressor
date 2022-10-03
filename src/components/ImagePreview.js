import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import React from "react";

function ImagePreview(props) {
  return (
    <Box
      mt={7}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          borderRadius: "1rem",
          boxShadow: "none",
          position: "relative",
          textAlign: "center",
          maxWidth: 500,
          // maxHeight: 360,
          "&::after": {
            content: '""',
            display: "block",
            position: "absolute",
            width: "100%",
            height: "100%",
            bottom: 0,
            zIndex: 0,
            background: "rgba(0,0,0,0.5)",
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{ zIndex: "1" }}
          height="440"
          image={`${props.selectedFile}`}
        />
        <Box
          sx={{
            position: "absolute",
            zIndex: 2,
            bottom: 0,
            width: "100%",
            height: "100%",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            p={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Array Methods.png</Typography>
            <Button
              sx={{
                color: "#fff",
              }}
            >
              ✖
            </Button>
          </Box>
          <Typography fontWeight={"bold"} fontSize={"80px"}>
            - 83%
          </Typography>
          <Button variant="contained">Download</Button>
        </Box>
      </Card>
    </Box>
  );
}

export default ImagePreview;
