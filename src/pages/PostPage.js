import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import GemHeader from '../components/GemHeader';
import PostActionsPane from '../components/postPage/PostActionsPane';
import AuthenticatedUserContext from '../contexts/AuthenticatedUserContext';
import { GET_CURRENT_USER, GET_POST } from '../utils/GraphQLRequests';
import Post from '../components/posts/Post';
import { GEM_HEADER_HEIGHT } from '../utils/CssConstants';

const useStyles = makeStyles((theme) => ({
  PostContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${theme.spacing(GEM_HEADER_HEIGHT)}px)`,
    maxheight: `calc(100vh - ${theme.spacing(GEM_HEADER_HEIGHT)}px)`,
  },
  PostPaper: {
    width: '100%',
    minHeight: '70vh',
  },
  PostDivContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '100%',
    // maxHeight: '100%',
  },
  PostItem: {
    display: 'flex',
    alignItems: 'center',
    width: '60%',
  },
  PostActionsPane: {
    width: '40%',
  },
}));

function PostPage() {
  const classes = useStyles();
  const { id: postId } = useParams();

  const { setAuthenticatedUserInfo } = React.useContext(AuthenticatedUserContext);
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState(null);

  const { data: currentUserData, error: currentUserError } = useQuery(GET_CURRENT_USER);
  const {
    data: currentPostData,
    error: currentPostError,
    refetch: refetchCurrentPost,
  } = useQuery(GET_POST, { variables: { id: Number(postId) } });

  React.useEffect(() => {
    if (!currentPostData) return;
    const { comments: postComments, ...currentPost } = currentPostData.getPost;
    setPost(currentPost);
    setComments(postComments);
  }, [currentPostData, currentPostError]);

  React.useEffect(() => {
    if (!currentUserData) return;
    setAuthenticatedUserInfo(currentUserData.getCurrentUser);
  }, [currentUserData, currentUserError]);

  return (
    !!post && (
      <>
        <GemHeader />
        <Container maxWidth="lg" className={classes.PostContainer}>
          <Paper className={classes.PostPaper}>
            <div className={classes.PostDivContainer}>
              <div className={classes.PostItem}>
                <Post post={post} />
              </div>
              <div className={classes.PostActionsPane}>
                <PostActionsPane comments={comments} />
              </div>
            </div>
          </Paper>
        </Container>
      </>
    )
  );
}

export default PostPage;
