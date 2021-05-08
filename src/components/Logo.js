import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BlueGemsLogo from '../bluegem.svg';

const useStyles = makeStyles((theme) => ({
  image: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

function Logo() {
  const classes = useStyles();

  return <img className={classes.image} src={BlueGemsLogo} alt="Bluegems icon" variant="square" />;
}

export default Logo;
