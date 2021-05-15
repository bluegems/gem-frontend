import React, { useState } from 'react';
import { Button, TextField, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';

import { REGISTER } from '../utils/GraphQLRequests';

const useStyles = makeStyles({
  submit: {
    margin: '1rem 0 1rem 0',
  },
});

// TODO: Toast on error
function RegisterForm() {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO: Redirect to login or just log the user in
  const [register, { loading, error }] = useMutation(REGISTER);

  return (
    <div>
      <form
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          console.log(email.value);
          await register({
            variables: {
              email,
              password,
              firstName,
              lastName,
              username,
            },
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
      {loading && <p>Loading ...</p>}
      {error && <p>Error !!!</p>}
    </div>
  );
}

export default RegisterForm;
