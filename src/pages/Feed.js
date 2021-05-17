import React, { useEffect } from 'react';

import { Container, Grid } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import AuthenticatedUserContext from '../contexts/AuthenticatedUserContext';
import LeftPane from '../components/currentUser/CurrentUserPane';
import NewPost from '../components/posts/NewPost';
import PostsFeed from '../components/posts/PostsFeed';
import FriendsPane from '../components/friends/FriendsPane';
import GemHeader from '../components/GemHeader';
import { GET_CURRENT_USER_AND_FRIENDS_POSTS } from '../utils/GraphQLRequests';

function Feed() {
  const { authenticatedUserInfo, setAuthenticatedUserInfo } = React.useContext(
    AuthenticatedUserContext
  );
  const [friendsPosts, setFriendsPosts] = React.useState(null);
  const { data } = useQuery(GET_CURRENT_USER_AND_FRIENDS_POSTS);

  useEffect(() => {
    if (!data) return;
    setAuthenticatedUserInfo(data.getCurrentUser);
    setFriendsPosts(data.getFriendsPosts);
  }, [data]);

  return (
    !!authenticatedUserInfo && (
      <>
        <GemHeader setAuthenticatedUserInfo={setAuthenticatedUserInfo} />
        <Container maxWidth="lg">
          <Grid container>
            <Grid item lg={3}>
              <LeftPane />
            </Grid>
            <Grid item lg={6}>
              <NewPost />
              {!!friendsPosts && <PostsFeed posts={friendsPosts} />}
            </Grid>
            <Grid item lg={3}>
              <FriendsPane friends={authenticatedUserInfo.friends} />
            </Grid>
          </Grid>
        </Container>
      </>
    )
  );
}

export default Feed;
