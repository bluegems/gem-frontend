import { createContext } from 'react';

const SnackbarContext = createContext({
  snackbarOpen: false,
  snackbarMessage: '',
  snackbarSeverity: '',
  setSnackbarOpen: () => {},
  setSnackbarMessage: () => {},
  setSnackbarSeverity: () => {},
});

export default SnackbarContext;
