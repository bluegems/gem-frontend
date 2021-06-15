import { useLazyQuery, useQuery } from '@apollo/client';
import { Button, Container, Divider, makeStyles, TextField, Typography } from '@material-ui/core';
import { Block, SearchOutlined } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import GemHeader from '../components/GemHeader';
import SearchResultUser from '../components/search/SearchResultUser';
import AuthenticatedUserContext from '../contexts/AuthenticatedUserContext';
import SnackbarContext from '../contexts/SnackbarContext';
import { catchErrorOnLazyQuery } from '../utils/CommonUtils';
import { TOAST_SEVERITY_ERROR } from '../utils/Constants';
import { GET_CURRENT_USER, SEARCH_USERS } from '../utils/GraphQLRequests';

const useStyles = makeStyles((theme) => ({
  SearchSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh',
  },
  SearchForm: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '50%',
  },
  ResultsSection: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: theme.spacing(2),
  },
}));

function Search() {
  const history = useHistory();
  const classes = useStyles();

  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );
  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const { setAuthenticatedUserInfo } = React.useContext(AuthenticatedUserContext);

  const [searchString, setSearchString] = React.useState('');
  const [searchResultUsers, setSearchResultUsers] = React.useState(null);

  const { data: currentUserData, error: currentUserError } = useQuery(GET_CURRENT_USER);
  React.useEffect(() => {
    if (!!currentUserError) {
      toast(TOAST_SEVERITY_ERROR, "We're facing some issues on that server");
      history.replace('/login');
    }
  }, [currentUserError]);
  React.useEffect(() => {
    if (!currentUserData) return;
    setAuthenticatedUserInfo(currentUserData.getCurrentUser);
  }, [currentUserData]);

  const [searchUsers, { data: searchUsersData, error: searchUsersError }] = useLazyQuery(
    SEARCH_USERS
  );
  React.useEffect(() => {
    if (!!searchUsersError) toast(TOAST_SEVERITY_ERROR, 'Failed to search for users');
  }, [searchUsersError]);
  React.useEffect(() => {
    if (!searchUsersData) return;
    setSearchResultUsers(searchUsersData.searchUsers);
  }, [searchUsersData]);

  return (
    <>
      <GemHeader setAuthenticatedUserInfo={setAuthenticatedUserInfo} />
      <Container maxWidth="lg">
        <div className={classes.SearchSection}>
          <form
            autoComplete="off"
            onSubmit={async (event) => {
              event.preventDefault();
              await catchErrorOnLazyQuery(searchUsers, {
                searchString,
              });
            }}
            className={classes.SearchForm}
          >
            <TextField
              value={searchString}
              onChange={(event) => setSearchString(event.target.value)}
              name="searchString"
              margin="normal"
              variant="outlined"
              id="searchString"
              label="Search for name or username"
              fullWidth
              required
              autoFocus
            />
            <Button type="submit">
              <SearchOutlined fontSize="large" />
            </Button>
          </form>
        </div>
        <Divider variant="middle" />
        {!!searchResultUsers && !!searchResultUsers.length ? (
          <div className={classes.ResultsSection}>
            {searchResultUsers.map((user) => (
              <SearchResultUser key={`${user.username}#${user.tag}`} {...user} />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '30vh',
            }}
          >
            <Block style={{ width: '80px', height: '80px' }} />
            <Typography style={{ color: 'gray' }}>No matching users</Typography>
          </div>
        )}
      </Container>
    </>
  );
}

export default Search;
