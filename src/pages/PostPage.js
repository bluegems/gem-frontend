import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container, makeStyles, Paper } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import GemHeader from '../components/GemHeader';
import PostActionsPane from '../components/postPage/PostActionsPane';
import AuthenticatedUserContext from '../contexts/AuthenticatedUserContext';
import { GET_CURRENT_USER, GET_POST } from '../utils/GraphQLRequests';
import Post from '../components/posts/Post';
import { GEM_HEADER_HEIGHT } from '../utils/CssConstants';
import SnackbarContext from '../contexts/SnackbarContext';
import { TOAST_SEVERITY_ERROR } from '../utils/Constants';

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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minHeight: '100%',
    // maxHeight: '100%',
  },
  PostItem: {
    display: 'flex',
    alignItems: 'center',
    width: '40%',
  },
  PostActionsPane: {
    width: '40%',
  },
}));

function PostPage() {
  const classes = useStyles();
  const { id: postId } = useParams();
  const history = useHistory();

  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );
  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const { setAuthenticatedUserInfo } = React.useContext(AuthenticatedUserContext);
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState(null);

  const { data: currentUserData, error: currentUserError } = useQuery(GET_CURRENT_USER);
  const {
    data: currentPostData,
    error: currentPostError,
    refetch: refetchCurrentPost,
  } = useQuery(!!postId && GET_POST, { variables: { id: Number(postId) } });

  React.useEffect(() => {
    if (!!currentPostError) {
      if (!currentUserData.getPost) {
        toast(TOAST_SEVERITY_ERROR, "Cannot see a stranger's posts");
        history.replace('/feed');
      }
    }
  }, [currentPostError]);
  React.useEffect(() => {
    if (!currentPostData) return;
    const { comments: postComments, ...currentPost } = currentPostData.getPost;
    setPost(currentPost);
    setComments(postComments);
  }, [currentPostData]);

  React.useEffect(() => {
    if (!!currentUserError) {
      toast(TOAST_SEVERITY_ERROR, "We're facing some issues on the server");
      history.replace('/login');
    }
  }, [currentUserError]);
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
                <Post post={post} linkProfile />
              </div>
              <div className={classes.PostActionsPane}>
                <PostActionsPane
                  comments={comments}
                  refetch={refetchCurrentPost}
                  postId={postId}
                  isLiked={post.isLiked}
                />
              </div>
            </div>
          </Paper>
        </Container>
      </>
    )
  );
}

export default PostPage;
