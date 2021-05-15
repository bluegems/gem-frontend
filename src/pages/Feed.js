import React from 'react';

import { Container, Grid } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import AuthenticatedUserContext from '../contexts/AuthenticatedUserContext';
import LeftPane from '../components/leftPane/LeftPane';
import NewPost from '../components/feedPane/NewPost';
import PostsFeed from '../components/feedPane/PostsFeed';
import RightPane from '../components/rightPane/RightPane';
import GemHeader from '../components/GemHeader';
import { GET_CURRENT_USER } from '../utils/GraphQLRequests';

function Feed() {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  if (loading) return null;
  if (error) return <p>Faced error</p>;

  const { getCurrentUser: currentUser } = data;
  return (
    <AuthenticatedUserContext.Provider value={currentUser}>
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
    </AuthenticatedUserContext.Provider>
  );
}

export default Feed;
