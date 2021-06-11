import { ApolloConsumer } from '@apollo/client';
import { Button, Container, makeStyles, Paper } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import AuthenticatedUserContext from '../contexts/AuthenticatedUserContext';
import { GEM_AUTHORIZATION_TOKEN_COOKIE } from '../utils/Constants';
import { GEM_HEADER_HEIGHT } from '../utils/CssConstants';
import Logo from './Logo';

const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  navbar: {
    height: theme.spacing(GEM_HEADER_HEIGHT),
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
  navbarIcons: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));

function GemHeader() {
  const classes = useStyles();
  const history = useHistory();

  const { setAuthenticatedUserInfo } = React.useContext(AuthenticatedUserContext);

  const handleLogout = (client) => {
    // Clear Apollo cache
    client.clearStore();
    // Clear authenticated user context
    setAuthenticatedUserInfo(null);
    // Clear authorization cookie
    cookies.remove(GEM_AUTHORIZATION_TOKEN_COOKIE);
    // Route to login
    history.replace('/');
  };

  return (
    <Paper className={classes.navbar} square>
      <Container className={classes.navbarContainer} maxWidth="lg">
        <Link to={{ pathname: '/feed' }}>
          <Logo />
        </Link>
        <div className={classes.navbarIcons}>
          <Link to={{ pathname: '/search' }}>
            <Button>
              <SearchOutlined fontSize="large" />
            </Button>
          </Link>
          <ApolloConsumer>
            {(client) => (
              <Button onClick={() => handleLogout(client)}>
                <ExitToAppIcon fontSize="large" />
              </Button>
            )}
          </ApolloConsumer>
        </div>
      </Container>
    </Paper>
  );
}

export default GemHeader;
