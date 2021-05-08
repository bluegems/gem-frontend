// React
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
// 3rd party
import { Button, TextField, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { gql, useMutation } from '@apollo/client';
import Cookies from 'universal-cookie';
// Custom
import { GEM_AUTHORIZATION_TOKEN_COOKIE } from '../utils/Constants';

const cookies = new Cookies();

const useStyles = makeStyles({
  submit: {
    margin: '1rem 0 1rem 0',
  },
});

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const setCookie = function setCookie(token) {
  cookies.set(GEM_AUTHORIZATION_TOKEN_COOKIE, token, { path: '/', sameSite: 'strict' });
};

function LoginForm() {
  const classes = useStyles();

  const history = useHistory();
  const email = useRef('');
  const password = useRef('');

  const [login, { error }] = useMutation(LOGIN, {
    onCompleted: (data) => setCookie(data.login),
  });

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        await login({
          variables: {
            email: email.current?.value,
            password: password.current?.value,
          },
        });
        if (!error) {
          history.push('/feed');
        }
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            inputRef={email}
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
            inputRef={password}
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
