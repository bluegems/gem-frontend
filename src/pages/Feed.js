import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LeftPane from '../components/currentUser/CurrentUserPane';
import UsersPane from '../components/friends/UsersPane';
import GemHeader from '../components/GemHeader';
import NewPost from '../components/posts/NewPost';
import PostsFeed from '../components/posts/PostsFeed';
import AuthenticatedUserContext from '../contexts/AuthenticatedUserContext';
import SnackbarContext from '../contexts/SnackbarContext';
import { catchErrorOnQuery } from '../utils/CommonUtils';
import { TOAST_SEVERITY_ERROR } from '../utils/Constants';
import { GET_CURRENT_USER, GET_FRIENDS_POSTS } from '../utils/GraphQLRequests';

function Feed() {
  const history = useHistory();
  const { authenticatedUserInfo, setAuthenticatedUserInfo } = React.useContext(
    AuthenticatedUserContext
  );

  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );

  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const [friendsPosts, setFriendsPosts] = React.useState(null);
  const { data: currentUserData, error: currentUserError } = catchErrorOnQuery(GET_CURRENT_USER);
  const { data: friendsPostsData, error: friendsPostsError } = catchErrorOnQuery(GET_FRIENDS_POSTS);

  useEffect(() => {
    if (!!currentUserError) {
      toast(TOAST_SEVERITY_ERROR, "We're facing some issues on the server");
      history.replace('/login');
    }
  }, [currentUserError]);
  useEffect(() => {
    if (!currentUserData) return;
    setAuthenticatedUserInfo(currentUserData.getCurrentUser);
  }, [currentUserData]);

  useEffect(() => {
    if (!!friendsPostsError) toast(TOAST_SEVERITY_ERROR, 'Could not fetch posts, try refreshing');
  }, [friendsPostsError]);
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
