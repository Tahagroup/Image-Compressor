import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";

function CustomSnackbar(props) {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={5000}
      TransitionComponent={SlideTransition}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      onClose={props.handleCloseSnackbar} // will be called after autoHideDuration finishes
      // action={action} action is a react-component which will be rendered inside snackbar>
    >
      <Alert severity="warning" sx={{ width: "100%" }}>
        {props.errorMessage}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
