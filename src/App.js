import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';

import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import { isAuthenticated } from './utils/AuthUtils';
import Profile from './pages/Profile';
import AuthenticatedUserContext from './contexts/AuthenticatedUserContext';

function App() {
  const [authenticatedUserInfo, setAuthenticatedUserInfo] = React.useState(null);

  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <AuthenticatedUserContext.Provider
          value={{ authenticatedUserInfo, setAuthenticatedUserInfo }}
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
            <AuthenticatedRoute exact path="/profile/:username/:tag">
              <Profile />
            </AuthenticatedRoute>
          </Switch>
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
