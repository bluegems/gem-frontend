import { useMutation } from '@apollo/client';
import { Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { Block, Favorite, FavoriteBorderOutlined, Send } from '@material-ui/icons';
import React from 'react';
import SnackbarContext from '../../contexts/SnackbarContext';
import { catchErrorOnMutation } from '../../utils/CommonUtils';
import { TOAST_SEVERITY_ERROR } from '../../utils/Constants';
import { CREATE_COMMENT, LIKE_POST, UNLIKE_POST } from '../../utils/GraphQLRequests';
import PostComment from './PostComment';

const useStyles = makeStyles((theme) => ({
  ActionsPane: {
    height: `calc(100% - ${theme.spacing(4)}px)`,
    maxHeight: `calc(100% - ${theme.spacing(4)}px)`,
    margin: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  LikeButton: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  CommentsContainer: {
    width: '100%',
    height: '60vh',
    maxHeight: '60vh',
    overflow: 'auto',
    padding: theme.spacing(1),
  },
  CommentFormContainer: {
    width: '100%',
    padding: theme.spacing(1),
  },
  CommentForm: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

function PostActionsPane({ comments, postId, isLiked, refetch }) {
  const classes = useStyles();

  const { setSnackbarOpen, setSnackbarSeverity, setSnackbarMessage } = React.useContext(
    SnackbarContext
  );

  const [createComment, { data: createCommentData, error: createCommentError }] = useMutation(
    CREATE_COMMENT
  );
  const [likePost, { data: likePostData, error: likePostError }] = useMutation(LIKE_POST);
  const [unlikePost, { data: unlikePostData, error: unlikePostError }] = useMutation(UNLIKE_POST);
  const [text, setText] = React.useState('');

  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  React.useEffect(() => {
    if (!!createCommentError) toast(TOAST_SEVERITY_ERROR, 'Failed to create comment');
  }, [createCommentError]);
  React.useEffect(() => {
    if (!createCommentData) return;
    refetch();
  }, [createCommentData]);

  React.useEffect(() => {
    if (!!likePostError) toast(TOAST_SEVERITY_ERROR, 'Failed to like post');
  }, [likePostError]);
  React.useEffect(() => {
    if (!likePostData) return;
    refetch();
  }, [likePostData]);

  React.useEffect(() => {
    if (!!unlikePostError) toast(TOAST_SEVERITY_ERROR, 'Failed to unlike post');
  }, [unlikePostError]);
  React.useEffect(() => {
    if (!unlikePostData) return;
    refetch();
  }, [unlikePostData]);

  const handleLike = () =>
    !!isLiked
      ? catchErrorOnMutation(unlikePost, { id: postId })
      : catchErrorOnMutation(likePost, { id: postId });

  return (
    <>
      <Paper elevation={1} className={classes.ActionsPane}>
        <Button onClick={handleLike}>
          {!!isLiked ? (
            <Favorite className={classes.LikeButton} color="secondary" />
          ) : (
            <FavoriteBorderOutlined className={classes.LikeButton} />
          )}
        </Button>
        {!!comments.length ? (
          <Paper variant="elevation" square elevation={1} className={classes.CommentsContainer}>
            {comments.map((comment) => (
              <PostComment key={comment.id} comment={comment} />
            ))}
          </Paper>
        ) : (
          <div
            style={{
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '50vh',
            }}
          >
            <Block style={{ width: '80px', height: '80px' }} />
            <Typography style={{ color: 'gray' }}>No comments on this post</Typography>
          </div>
        )}
        <div className={classes.CommentFormContainer}>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await catchErrorOnMutation(createComment, {
                text,
                postId,
              });
              setText('');
            }}
            className={classes.CommentForm}
          >
            <TextField
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
              variant="outlined"
              margin="normal"
              id="comment"
              name="comment"
              label="Comment"
              required
              multiline
              rows={2}
              rowsMax={3}
              fullWidth
            />
            {!!text.trim() ? (
              <Button type="submit">
                <Send />
              </Button>
            ) : (
              <Button type="submit" disabled>
                <Send />
              </Button>
            )}
          </form>
        </div>
      </Paper>
    </>
  );
}

export default PostActionsPane;
