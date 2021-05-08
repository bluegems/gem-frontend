import React from 'react';
import { Container, makeStyles, Paper } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Logo from './Logo';

const useStyles = makeStyles((theme) => ({
  navbar: {
    height: theme.spacing(8),
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
}));

function GemHeader() {
  const classes = useStyles();

  return (
    <Paper className={classes.navbar} square>
      <Container className={classes.navbarContainer} maxWidth="lg">
        <Logo />
        <ExitToAppIcon fontSize="large" />
      </Container>
    </Paper>
  );
}

export default GemHeader;
