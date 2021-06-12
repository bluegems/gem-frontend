import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Feed from './pages/Feed';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PostPage from './pages/PostPage';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Search from './pages/Search';
import { isAuthenticated } from './utils/AuthUtils';

function Routes() {
  return (
    <BrowserRouter>
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

        {/* Fallback Route */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
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

export default Routes;
