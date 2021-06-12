import { useQuery } from '@apollo/client';
import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UsersPane from '../components/friends/UsersPane';
import GemHeader from '../components/GemHeader';
import PostsFeed from '../components/posts/PostsFeed';
import ProfileInformation from '../components/profile/ProfileInformation';
import AuthenticatedUserContext from '../contexts/AuthenticatedUserContext';
import SnackbarContext from '../contexts/SnackbarContext';
import { TOAST_SEVERITY_ERROR } from '../utils/Constants';
import { GET_CURRENT_USER, GET_USER_INFORMATION } from '../utils/GraphQLRequests';

function Profile() {
  const history = useHistory();
  const { username, tag } = useParams();

  const [userInformation, setUserInformation] = React.useState(null);
  const [posts, setPosts] = React.useState(null);
  const [friends, setFriends] = React.useState(null);

  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );
  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const { authenticatedUserInfo, setAuthenticatedUserInfo } = React.useContext(
    AuthenticatedUserContext
  );

  const { data: currentUserData, error: currentUserError } = useQuery(GET_CURRENT_USER);
  const { data: userData, error: userError, refetch } = useQuery(GET_USER_INFORMATION, {
    variables: { username, tag },
  });

  React.useEffect(() => {
    if (!!userError) toast(TOAST_SEVERITY_ERROR, 'Could not fetch user details, try refreshing');
  }, [userError]);
  React.useEffect(() => {
    if (!userData) return;
    setUserInformation(userData.getUser);
    setPosts(userData.getUser.posts);
    setFriends(userData.getUser.friends);
  }, [userData]);

  React.useEffect(() => {
    if (!!currentUserError) {
      toast(TOAST_SEVERITY_ERROR, "We're facing some issues on the server");
      history.replace('/login');
    }
  }, [currentUserError]);
  React.useEffect(() => {
    if (!currentUserData) return;
    setAuthenticatedUserInfo(currentUserData.getCurrentUser);
  }, [currentUserData]);

  return (
    !!userInformation &&
    !!authenticatedUserInfo && (
      <>
        <GemHeader />
        <Container maxWidth="lg">
          <ProfileInformation {...userInformation} refetch={refetch} />
          <Grid container spacing={3}>
            <Grid item lg={9}>
              {!!posts && <PostsFeed posts={userInformation.posts} linkPost />}
            </Grid>
            <Grid item lg={3}>
              {!!friends && (
                <UsersPane
                  users={userInformation.friends}
                  paneHeading={`${userInformation.firstName}'s friends`}
                  emptyMessage="This user has no friends"
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </>
    )
  );
}

export default Profile;
