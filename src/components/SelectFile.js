import React, { useState } from "react";
import "./SelectFile.css";
import {
  Box,
  InputAdornment,
  LinearProgress,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import imageCompression from "browser-image-compression";
import CustomSnackbar from "./utilities/CustomSnackbar";

function SelectFile(props) {
  const [dragActive, setDragActive] = React.useState(false);
  const [maxSizeTF, setmaxSizeTF] = useState("");
  const [maxWHTF, setmaxWHTF] = useState("");
  const [loadingProgress, setLoadingProgress] = useState();
  const [{ open, message }, setopenSnackbar] = useState({
    open: false,
    message: undefined,
  });
  const theme = useTheme();
  const mobile = useMediaQuery("(max-width:600px)");
  /////////////////////////////////////////////////
  function maxSizeTFHandler(event) {
    if (event.target.value >= 0) {
      setmaxSizeTF(event.target.value);
    }
  }
  function maxWHTFHandler(event) {
    if (event.target.value >= 0) {
      setmaxWHTF(event.target.value);
    }
  }
  /////////////////////////////////////////////////
  function handleCloseSnackbar() {
    setopenSnackbar({
      open: false,
      message: undefined,
    });
  }
  /////////////////////////////////////////////////
  async function handleImageUpload(
    file,
    providedOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    }
  ) {
    const imageFile = file;
    const options = {
      ...providedOptions,
      onProgress: (value) => {
        setLoadingProgress(value);
      },
      // maxSizeMB: 1,
      // maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    //
    async function getImageDimensions(image) {
      let url = URL.createObjectURL(image);
      let img = new Image();
      // let originalImageDimensions;
      // img.onload = function () {
      //   originalImageDimensions = {
      //     height: img.height,
      //     width: img.width,
      //   };
      // };
      img.src = url;
      return {
        height: img.height,
        width: img.width,
      };
    }
    const originalImageDimensions = await getImageDimensions(imageFile);
    //
    try {
      if (
        providedOptions.maxSizeMB < 0.01 ||
        providedOptions.maxWidthOrHeight < 10
      ) {
        throw Error("Option values can not be too small.");
      } else if (
        providedOptions.maxSizeMB > imageFile.size ||
        (maxSizeTF > originalImageDimensions.width &&
          maxWHTF > originalImageDimensions.height)
      ) {
        throw Error("Option values can not be greater than original image.");
      }
      const compressedFile = await imageCompression(imageFile, options);
      const fileCompressSummary = {
        maxSizeMB: providedOptions.maxSizeMB,
        maxWidthOrHeight: providedOptions.maxWidthOrHeight,
        beforeSize: imageFile.size,
        afterSize: compressedFile.size,
        fileName: imageFile.name,
      };
      props.onFileChange(
        {
          original: URL.createObjectURL(file),
          compressed: URL.createObjectURL(compressedFile),
        },
        fileCompressSummary
      );
    } catch (error) {
      setopenSnackbar({ open: true, message: error.message });
    }
  }
  /////////////////////////////////////////////////

  // handle drag events for UI changes
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped in zone
  const handleDropEvent = async function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleImageUpload(e.dataTransfer.files[0], {
        maxSizeMB: maxSizeTF || 1,
        maxWidthOrHeight: maxWHTF || 1920,
      });
      // props.onFileChange(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };

  // triggers when file is selected with button
  const handleChange = async function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleImageUpload(e.target.files[0], {
        maxSizeMB: maxSizeTF || 1,
        maxWidthOrHeight: maxWHTF || 1920,
      });
      // props.onFileChange(URL.createObjectURL(e.target.files[0]));
    }
  };
  //async function cancelHandler() {
  // props.onFileChange(undefined, undefined);
  //}
  //////// return: //////////////////////////////////////////////////////////////////
  return (
    <Box>
      <form
        autoComplete="off"
        style={{
          marginTop: "24px",
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          "&::focus": {
            // fontSize: "50px",
          },
        }}
      >
        {mobile && <Typography>Options:</Typography>}
        <Tooltip title="limites output file size to the specified value" arrow>
          <TextField
            variant="filled"
            sx={{
              width: "200px",
              "&::focus": theme.palette.text.secondary,
              color: theme.palette.text.secondary,
            }}
            label="Max file size"
            type="tel"
            value={maxSizeTF}
            onChange={maxSizeTFHandler}
            InputProps={{
              endAdornment: <InputAdornment position="end">MB</InputAdornment>,
            }}
          />
        </Tooltip>
        <Tooltip
          title="makes image's both height & width smaller than the provided value"
          arrow
        >
          <TextField
            variant="filled"
            sx={{
              width: "200px",
            }}
            label="Max size of sides"
            type="tel"
            value={maxWHTF}
            onChange={maxWHTFHandler}
            InputProps={{
              endAdornment: <InputAdornment position="end">px</InputAdornment>,
            }}
          />
        </Tooltip>
      </form>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
        mt={mobile ? 5 : 15}
      >
        <form
          id="form-file-upload"
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="file"
            id="input-file-upload"
            multiple={false}
            onChange={handleChange}
            accept="image/*"
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={dragActive ? "drag-active" : "" + mobile ? "mobile" : ""}
            // #FIXME:
            style={{ color: theme.palette.text.secondary }}
          >
            {loadingProgress && (
              <Box>
                <LinearProgress
                  variant="determinate"
                  value={loadingProgress}
                  color="success"
                />
                <br />
                <Typography>Compression in progress...</Typography>
              </Box>
            )}
            {!loadingProgress && (
              <Box sx={{ textAlign: "center" }}>
                <Typography mb={1}>
                  Drag and drop your file or click here
                </Typography>
                <UploadFile fontSize="large" />
              </Box>
            )}
          </label>
          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDropEvent}
            ></div>
          )}
        </form>
        <div
          style={{
            height: "auto",
            width: "50%",
            maxWidth: "400px",
            maxHeight: "400px",
          }}
        ></div>
      </Box>
      <CustomSnackbar
        open={open}
        errorMessage={message}
        handleCloseSnackbar={handleCloseSnackbar}
      />
    </Box>
  );
}

export default SelectFile;
