import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

function ImagePreview(props) {
  function downloadButtonHandler(url, suffix) {
    const a = document.createElement("a");
    a.href = url;
    // create filename + compressed
    a.download = `${props.fileCompressSummary.fileName
      .split(".")
      .slice(0, -1)}-${suffix}.${props.fileCompressSummary.fileName
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
  const theme = useTheme();
  const mobile = useMediaQuery("(max-width:600px)");

  // console.log(theme.palette.primary.main);
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      p={mobile ? 2 : 8}
      pl={mobile ? 2 : 15}
      pr={mobile ? 2 : 15}
    >
      <Grid item lg>
        {/* Image Preview Card */}
        <Card
          sx={{
            // borderRadius: "1rem",
            boxShadow: "none",
            position: "relative",
            textAlign: "center",
            // maxWidth: 700,
            // maxHeight: 360,
            "&::after": {
              content: '""',
              display: "block",
              position: "absolute",
              width: "100%",
              height: "100%",
              bottom: 0,
              zIndex: 0,
              background: "rgba(0,0,0,0.6)",
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{ zIndex: "1" }}
            height="440"
            image={`${props.selectedFile.compressed}`}
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
              justifyContent: "flex-start",
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
              <Typography component="div">
                {props.fileCompressSummary.fileName}
              </Typography>
              <IconButton onClick={closePreviewHandler} size="large">
                <CloseIcon sx={{ color: "white" }} fontSize="inherit" />
              </IconButton>
            </Box>
            <Typography
              component="div"
              fontWeight={"bold"}
              fontSize={"100px"}
              mt={7}
            >
              -{" "}
              {Math.ceil(
                100 -
                  (props.fileCompressSummary.afterSize /
                    props.fileCompressSummary.beforeSize) *
                    100
              )}
              {"%"}
              <Typography component="div">Saved!</Typography>
            </Typography>
          </Box>
        </Card>
      </Grid>
      <Grid
        container
        item
        flexDirection="column"
        lg={4}
        sm={12}
        sx={{
          width: "100%",
          "&>div": {
            paddingBottom: "16px",
          },
        }}
      >
        <Grid item>
          <Card>
            <CardContent
              sx={{
                padding: "22px",
                "&:last-child": {
                  paddingBottom: "22px",
                },
              }}
            >
              <Typography component="div">{`Original file size: ${(
                props.fileCompressSummary.beforeSize /
                1024 /
                1024
              ).toFixed(2)} MB`}</Typography>
              <Typography component="div">{`Compressed file size: ${(
                props.fileCompressSummary.afterSize /
                1024 /
                1024
              ).toFixed(2)}  MB`}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Typography component="div" gutterBottom variant="h5">
                Your Options
              </Typography>
              <hr />
              <Typography component="div">
                {`File's max size: ${props.fileCompressSummary.maxSizeMB} MB`}{" "}
                <br />
                {`Image's max width/height: ${props.fileCompressSummary.maxWidthOrHeight} Pixels`}
              </Typography>
            </CardContent>
            <CardActions
              sx={{ justifyContent: "space-around", alignSelf: "flex-end" }}
            >
              <Button
                onClick={closePreviewHandler}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  backgroundColor: theme.palette.action.active,
                  color: "#000",
                  "&:hover": {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              >
                Retry
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {/* 3rd Card */}
        <Grid item>
          <Card>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                "&:last-child": {
                  paddingBottom: "16px",
                },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                }}
                size="large"
                onClick={() => {
                  downloadButtonHandler(
                    props.selectedFile.original,
                    "original"
                  );
                }}
              >
                Download Original File
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{
                  textTransform: "none",
                }}
                onClick={() => {
                  downloadButtonHandler(
                    props.selectedFile.compressed,
                    "compressed"
                  );
                }}
              >
                {" "}
                Download Compressed File
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ImagePreview;
