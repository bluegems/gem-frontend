import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';

import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/register" />
          </Route>
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
