import React from 'react';

import { Container, Grid } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';

import AuthenticatedUserContext from '../contexts/AuthenticatedUserContext';
import LeftPane from '../components/leftPane/LeftPane';
import NewPost from '../components/feedPane/NewPost';
import PostsFeed from '../components/feedPane/PostsFeed';
import RightPane from '../components/rightPane/RightPane';
import GemHeader from '../components/GemHeader';

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      username
      tag
      firstName
      lastName
      bio
      birthdate
      profilePicture
    }
  }
`;

function Feed() {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  if (loading) return null;
  if (error) return <p>Faced error</p>;

  const { getCurrentUser: currentUser } = data;
  return (
    <AuthenticatedUserContext.Provider value={currentUser}>
      <div>
        <GemHeader />
        <Container maxWidth="lg">
          <Grid container>
            <Grid item lg={3}>
              <LeftPane />
            </Grid>
            <Grid item lg={6}>
              <NewPost />
              <PostsFeed />
            </Grid>
            <Grid item lg={3}>
              <RightPane />
            </Grid>
          </Grid>
        </Container>
      </div>
    </AuthenticatedUserContext.Provider>
  );
}

export default Feed;
