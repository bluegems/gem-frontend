// React
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
// 3rd party
import { Button, TextField, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import Cookies from 'universal-cookie';
// Custom
import { LOGIN } from '../utils/GraphQLRequests';
import AuthenticatedUserContext from "../contexts/AuthenticatedUserContext";
import { GEM_AUTHORIZATION_TOKEN_COOKIE } from '../utils/Constants';

const cookies = new Cookies();

const useStyles = makeStyles({
  submit: {
    margin: '1rem 0 1rem 0',
  },
});

const setCookie = function setCookie(token) {
  cookies.set(GEM_AUTHORIZATION_TOKEN_COOKIE, token, { path: '/', sameSite: 'strict' });
};

function LoginForm() {
  const classes = useStyles();
  const history = useHistory();

  const { state } = useLocation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [login, { data, error }] = useMutation(LOGIN);

  React.useEffect(() => {
    if (!data) return;
    setCookie(data.login);
    history.replace(state?.from || '/feed');
  }, [data, error]);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await login({
          variables: {
            email,
            password,
          },
        });
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
