import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Feed from './pages/Feed';
import Login from './pages/Login';
import PostPage from './pages/PostPage';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Search from './pages/Search';
import { isAuthenticated } from './utils/AuthUtils';

function Routes() {
  return (
    <>
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
    </>
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
