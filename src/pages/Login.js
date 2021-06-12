import React from 'react';
import { Container, Typography, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';
import Accreditation from '../components/common/Accreditation';

const useStyles = makeStyles({
  rootDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100vh',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '4rem',
  },
});

function Login() {
  const classes = useStyles();

  return (
    <div className={classes.rootDiv}>
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Logo width="8rem" />
          <Typography variant="h3" component="h3">
            Log in
          </Typography>
          <LoginForm />
        </div>
      </Container>
      <Accreditation />
    </div>
  );
}

export default Login;
