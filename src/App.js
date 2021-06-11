import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import ToastMessage from './components/common/ToastMessage';
import AuthenticatedUserContext from './contexts/AuthenticatedUserContext';
import SnackbarContext from './contexts/SnackbarContext';
import Feed from './pages/Feed';
import Login from './pages/Login';
import PostPage from './pages/PostPage';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Search from './pages/Search';
import { isAuthenticated } from './utils/AuthUtils';

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
      <Router>
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
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <AuthenticatedRoute exact path="/feed">
                <Feed />
              </AuthenticatedRoute>
              <AuthenticatedRoute exact path="/search">
                <Search />
              </AuthenticatedRoute>
              <AuthenticatedRoute exact path="/profile/:username/:tag">
                <Profile />
              </AuthenticatedRoute>
              <AuthenticatedRoute exact path="/post/:id">
                <PostPage />
              </AuthenticatedRoute>
            </Switch>
            <ToastMessage />
          </SnackbarContext.Provider>
        </AuthenticatedUserContext.Provider>
      </Router>
    </div>
  );
}

const AuthenticatedRoute = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      !!isAuthenticated() ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )
    }
  />
);

export default App;
