import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import SnackbarContext from '../../contexts/SnackbarContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ToastMessage() {
  const { snackbarOpen, snackbarMessage, snackbarSeverity, setSnackbarOpen } = React.useContext(
    SnackbarContext
  );

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}

export default ToastMessage;
