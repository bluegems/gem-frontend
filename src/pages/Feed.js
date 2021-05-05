import { Container, Grid } from '@material-ui/core';
import LeftPane from '../components/leftPane/LeftPane';
import NewPost from '../components/feedPane/NewPost';
import PostsFeed from '../components/feedPane/PostsFeed';
import RightPane from '../components/rightPane/RightPane';
import GemHeader from '../components/GemHeader';

function Feed() {
  const user = {
    userFirstName: 'Parinith',
    userLastName: 'Shekar',
    username: 'parinithshekar',
    tag: '1114',
    profilePicture:
      'https://i.pinimg.com/564x/5a/5f/47/5a5f473c8020387ec2ddad40f0cfea3f.jpg',
    bio: 'I like to burnout on code and have my coffee cold',
  };

  return (
    <div>
      <GemHeader />
      <Container maxWidth="lg">
        <Grid container lg={12}>
          <Grid item lg={3}>
            <LeftPane user={user} />
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
  );
}

export default Feed;
