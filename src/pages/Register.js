import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../components/Logo';
import RegisterForm from '../components/RegisterForm';

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '4rem',
  },
  formControl: {
    textAlign: 'left',
  },
  submit: {
    margin: '1rem 0 1rem 0',
  },
});

function Register() {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Logo width="8rem" />
        <Typography className={classes.typography} variant="h3" component="h3">
          Sign up!
        </Typography>
        <RegisterForm />
      </div>
    </Container>
  );
}

export default Register;
