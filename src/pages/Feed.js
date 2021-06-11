import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import LeftPane from '../components/currentUser/CurrentUserPane';
import UsersPane from '../components/friends/UsersPane';
import GemHeader from '../components/GemHeader';
import NewPost from '../components/posts/NewPost';
import PostsFeed from '../components/posts/PostsFeed';
import AuthenticatedUserContext from '../contexts/AuthenticatedUserContext';
import { catchErrorOnQuery } from '../utils/CommonUtils';
import { GET_CURRENT_USER, GET_FRIENDS_POSTS } from '../utils/GraphQLRequests';

function Feed() {
  const { authenticatedUserInfo, setAuthenticatedUserInfo } = React.useContext(
    AuthenticatedUserContext
  );

  const [friendsPosts, setFriendsPosts] = React.useState(null);
  const { data: currentUserData, error: currentUserError } = catchErrorOnQuery(GET_CURRENT_USER);
  const { data: friendsPostsData, error: friendsPostsError } = catchErrorOnQuery(GET_FRIENDS_POSTS);

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
              {!!friendsPosts && <PostsFeed posts={friendsPosts} linkPost linkProfile />}
            </Grid>
            <Grid item lg={3}>
              <UsersPane
                users={authenticatedUserInfo.friendRequests}
                paneHeading="Friend requests"
                emptyMessage="No friend requests"
              />
            </Grid>
          </Grid>
        </Container>
      </>
    )
  );
}

export default Feed;
