import { useMutation } from '@apollo/client';
import { Button, Grid, Link, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import SnackbarContext from '../contexts/SnackbarContext';
import { catchErrorOnMutation } from '../utils/CommonUtils';
import { GEM_AUTHORIZATION_TOKEN_COOKIE, TOAST_SEVERITY_ERROR } from '../utils/Constants';
import { LOGIN } from '../utils/GraphQLRequests';

const cookies = new Cookies();

const useStyles = makeStyles({
  submit: {
    margin: '1rem 0 1rem 0',
  },
});

const setCookie = function setCookie(token) {
  cookies.set(GEM_AUTHORIZATION_TOKEN_COOKIE, token, { path: '/' });
};

function LoginForm() {
  const classes = useStyles();
  const history = useHistory();

  const { state } = useLocation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );

  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const [login, { data, error }] = useMutation(LOGIN);

  React.useEffect(() => {
    if (!data) return;
    setCookie(data.login);
    history.replace(state?.from || '/feed');
  }, [data]);
  React.useEffect(() => {
    if (!!error) {
      toast(TOAST_SEVERITY_ERROR, 'Failed to login');
    }
  }, [error]);

  return (
    <form
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault();
        cookies.remove(GEM_AUTHORIZATION_TOKEN_COOKIE);
        catchErrorOnMutation(login, { email, password });
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
            margin="normal"
            type="email"
            id="email"
            name="email"
            label="Email address"
            required
            fullWidth
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
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
        Log in
      </Button>
      <Grid container>
        <Grid item>
          <Link href="/register" variant="body2">
            Don&apos;t have an account? Sign up!
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
