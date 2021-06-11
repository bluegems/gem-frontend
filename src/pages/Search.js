import { useLazyQuery, useQuery } from '@apollo/client';
import { Button, Container, Divider, makeStyles, TextField, Typography } from '@material-ui/core';
import { Block, SearchOutlined } from '@material-ui/icons';
import React from 'react';
import GemHeader from '../components/GemHeader';
import SearchResultUser from '../components/search/SearchResultUser';
import AuthenticatedUserContext from '../contexts/AuthenticatedUserContext';
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
  const classes = useStyles();

  const { authenticatedUserInfo, setAuthenticatedUserInfo } = React.useContext(
    AuthenticatedUserContext
  );

  const [searchString, setSearchString] = React.useState('');
  const [searchResultUsers, setSearchResultUsers] = React.useState(null);

  const { data } = useQuery(GET_CURRENT_USER);
  React.useEffect(() => {
    if (!data) return;
    setAuthenticatedUserInfo(data.getCurrentUser);
  }, [data]);

  const [searchUsers, { data: searchUsersData, error: searchUsersError }] = useLazyQuery(
    SEARCH_USERS
  );
  React.useEffect(() => {
    if (searchUsersError) return;
    if (!searchUsersData) return;
    setSearchResultUsers(searchUsersData.searchUsers);
  }, [searchUsersData, searchUsersError]);

  return (
    <>
      <GemHeader setAuthenticatedUserInfo={setAuthenticatedUserInfo} />
      <Container maxWidth="lg">
        <div className={classes.SearchSection}>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await searchUsers({
                variables: {
                  searchString,
                },
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
