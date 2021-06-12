import { CssBaseline } from '@material-ui/core';
import React from 'react';
import './App.css';
import ToastMessage from './components/common/ToastMessage';
import AuthenticatedUserContext from './contexts/AuthenticatedUserContext';
import SnackbarContext from './contexts/SnackbarContext';
import Routes from './Routes';

function App() {
  // Global authenticated user
  const [authenticatedUserInfo, setAuthenticatedUserInfo] = React.useState(null);

  // Global toast
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('');

  return (
    <div className="App">
      <CssBaseline />
      <AuthenticatedUserContext.Provider
        value={{ authenticatedUserInfo, setAuthenticatedUserInfo }}
      >
        <SnackbarContext.Provider
          value={{
            snackbarOpen,
            snackbarMessage,
            snackbarSeverity,
            setSnackbarOpen,
            setSnackbarMessage,
            setSnackbarSeverity,
          }}
        >
          <Routes />
          <ToastMessage />
        </SnackbarContext.Provider>
      </AuthenticatedUserContext.Provider>
    </div>
  );
}

export default App;
