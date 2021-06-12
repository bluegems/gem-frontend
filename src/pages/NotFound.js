import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import BlankGem from '../blankgem.svg';

const useStyles = makeStyles({
  NotFoundRoot: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  },
  BlankGem: {
    width: '30vw',
  },
});

function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.NotFoundRoot}>
      <img alt="Page not found" src={BlankGem} className={classes.BlankGem} />
      <Typography variant="h1">Page Not Found</Typography>
    </div>
  );
}
export default NotFound;
