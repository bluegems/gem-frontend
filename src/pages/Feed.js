import React, { useEffect } from 'react';

import { Container, Grid } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import AuthenticatedUserContext from '../contexts/AuthenticatedUserContext';
import LeftPane from '../components/currentUser/CurrentUserPane';
import NewPost from '../components/posts/NewPost';
import PostsFeed from '../components/posts/PostsFeed';
import FriendsPane from '../components/friends/FriendsPane';
import GemHeader from '../components/GemHeader';
import { GET_CURRENT_USER, GET_FRIENDS_POSTS } from '../utils/GraphQLRequests';

function Feed() {
  const { authenticatedUserInfo, setAuthenticatedUserInfo } = React.useContext(
    AuthenticatedUserContext
  );
  const [friendsPosts, setFriendsPosts] = React.useState(null);
  const { data: currentUserData } = useQuery(GET_CURRENT_USER);
  const { data: friendsPostsData } = useQuery(GET_FRIENDS_POSTS);

  useEffect(() => {
    if (!currentUserData) return;
    setAuthenticatedUserInfo(currentUserData.getCurrentUser);
  }, [currentUserData]);

  useEffect(() => {
    if (!friendsPostsData) return;
    setFriendsPosts(friendsPostsData.getFriendsPosts);
  }, [friendsPostsData]);

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
