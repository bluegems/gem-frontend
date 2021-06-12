import { useMutation } from '@apollo/client';
import { Button, Grid, Link, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import SnackbarContext from '../contexts/SnackbarContext';
import { catchErrorOnMutation } from '../utils/CommonUtils';
import {
  GEM_AUTHORIZATION_TOKEN_COOKIE,
  TOAST_SEVERITY_ERROR,
  TOAST_SEVERITY_SUCCESS,
} from '../utils/Constants';
import { REGISTER } from '../utils/GraphQLRequests';

const cookies = new Cookies();

const useStyles = makeStyles({
  submit: {
    margin: '1rem 0 1rem 0',
  },
});

function RegisterForm() {
  const classes = useStyles();
  const history = useHistory();

  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );
  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [register, { data, error }] = useMutation(REGISTER);

  React.useEffect(() => {
    if (!!error) toast(TOAST_SEVERITY_ERROR, 'Failed to register. Try again');
  }, [error]);
  React.useEffect(() => {
    if (!data) return;
    toast(TOAST_SEVERITY_SUCCESS, 'Registration successful!');
    history.replace('/login');
  }, [data]);

  return (
    <div>
      <form
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          cookies.remove(GEM_AUTHORIZATION_TOKEN_COOKIE);
          await catchErrorOnMutation(register, {
            email,
            password,
            firstName,
            lastName,
            username,
          });
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              name="firstName"
              margin="normal"
              variant="outlined"
              id="firstName"
              label="First Name"
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              variant="outlined"
              margin="normal"
              id="lastName"
              label="Last Name"
              name="lastName"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              variant="outlined"
              margin="normal"
              id="username"
              name="username"
              label="Username"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              variant="outlined"
              margin="normal"
              type="email"
              id="email"
              name="email"
              label="Email address"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              variant="outlined"
              margin="normal"
              type="password"
              id="password"
              name="password"
              label="Password"
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign up
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Log in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default RegisterForm;
