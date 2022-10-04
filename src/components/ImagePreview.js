import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

function ImagePreview(props) {
  function downloadButtonHandler(url) {
    const a = document.createElement("a");
    a.href = url;
    // create filename + compressed
    a.download = `${props.fileCompressSummary.fileName
      .split(".")
      .slice(0, -1)}-compressed.${props.fileCompressSummary.fileName
      .split(".")
      .pop()}`;
    a.url = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  function closePreviewHandler() {
    props.onClose();
  }
  return (
    <Box
      mt={7}
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        gap: "15px",
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      <Card>
        <CardContent>
          <Typography>{`Original file size: ${(
            props.fileCompressSummary.beforeSize /
            1024 /
            1024
          ).toFixed(2)} MB`}</Typography>
          <Typography>{`Compressed file size: ${(
            props.fileCompressSummary.afterSize /
            1024 /
            1024
          ).toFixed(2)}  MB`}</Typography>
          <hr></hr>
          <Typography>
            {"options: "} <br />
            {`file's max size: ${props.fileCompressSummary.maxSizeMB} MB`}{" "}
            <br />
            {`image's max width/height: ${props.fileCompressSummary.maxWidthOrHeight} Pixels`}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ justifyContent: "space-around", alignSelf: "flex-end" }}
        >
          <Button variant="outlined">Again</Button>
        </CardActions>
      </Card>
      <Card>Image</Card>
      {/* Image Preview Card */}
      <Card
        sx={{
          // borderRadius: "1rem",
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
            <Typography>{props.fileCompressSummary.fileName}</Typography>
            <Button
              sx={{
                color: "#fff",
              }}
              onClick={closePreviewHandler}
            >
              ✖
            </Button>
          </Box>
          <Typography fontWeight={"bold"} fontSize={"80px"}>
            -{" "}
            {Math.ceil(
              100 -
                (props.fileCompressSummary.afterSize /
                  props.fileCompressSummary.beforeSize) *
                  100
            )}
            {"%"}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              downloadButtonHandler(props.selectedFile);
            }}
          >
            Download
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default ImagePreview;
