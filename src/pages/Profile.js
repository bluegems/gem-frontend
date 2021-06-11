import { useQuery } from '@apollo/client';
import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import UsersPane from '../components/friends/UsersPane';
import GemHeader from '../components/GemHeader';
import PostsFeed from '../components/posts/PostsFeed';
import ProfileInformation from '../components/profile/ProfileInformation';
import AuthenticatedUserContext from '../contexts/AuthenticatedUserContext';
import { GET_CURRENT_USER, GET_USER_INFORMATION } from '../utils/GraphQLRequests';

function Profile() {
  const { username, tag } = useParams();

  const [userInformation, setUserInformation] = React.useState(null);
  const [posts, setPosts] = React.useState(null);
  const [friends, setFriends] = React.useState(null);

  const { authenticatedUserInfo, setAuthenticatedUserInfo } = React.useContext(
    AuthenticatedUserContext
  );

  const { data: currentUserData } = useQuery(GET_CURRENT_USER);
  const { data: userData, error, refetch } = useQuery(GET_USER_INFORMATION, {
    variables: { username, tag },
  });

  React.useEffect(() => {
    if (!userData) return;
    setUserInformation(userData.getUser);
    setPosts(userData.getUser.posts);
    setFriends(userData.getUser.friends);
  }, [userData, error]);

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
