import React, { useState } from "react";
import "./SelectFile.css";
import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import imageCompression from "browser-image-compression";

function SelectFile(props) {
  const [dragActive, setDragActive] = React.useState(false);
  const [maxSizeTF, setmaxSizeTF] = useState(1);
  const [maxWHTF, setmaxWHTF] = useState(1920);
  const [isLoading, setIsLoading] = useState(false);
  /////////////////////////////////////////////////
  function maxSizeTFHandler(event) {
    setmaxSizeTF(event.target.value);
  }
  function maxWHTFHandler(event) {
    setmaxWHTF(event.target.value);
  }
  /////////////////////////////////////////////////
  async function handleImageUpload(
    file,
    providedOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    }
  ) {
    setIsLoading(true);
    const imageFile = file;
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      ...providedOptions,
      // maxSizeMB: 1,
      // maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      // console.log(
      //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      // ); // smaller than maxSizeMB
      const fileCompressSummary = {
        maxSizeMB: providedOptions.maxSizeMB,
        maxWidthOrHeight: providedOptions.maxWidthOrHeight,
        beforeSize: imageFile.size,
        afterSize: compressedFile.size,
        fileName: imageFile.name,
      };
      // console.log(fileCompressSummary);
      props.onFileChange(
        URL.createObjectURL(compressedFile),
        fileCompressSummary
      );
      // console.log(compressedFile);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
  //////// return: //////////////////////////////////////////////////
  return (
    <Box>
      <Box
        mt={3}
        sx={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Typography>Options:</Typography>
        <TextField
          id="outlined"
          label="Max size"
          type="number"
          value={maxSizeTF}
          onChange={maxSizeTFHandler}
          InputProps={{
            endAdornment: <InputAdornment position="end">MB</InputAdornment>,
          }}
        />
        <TextField
          id="outlined"
          label="Max size for sides"
          type="number"
          value={maxWHTF}
          onChange={maxWHTFHandler}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">pixels</InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
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
            className={dragActive ? "drag-active" : ""}
          >
            {isLoading && <CircularProgress />}
            {!isLoading && (
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
    </Box>
  );
}

export default SelectFile;
