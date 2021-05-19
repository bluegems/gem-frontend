import {
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Block,
  FavoriteBorderOutlined,
  InsertCommentOutlined,
  Send,
  SendOutlined,
} from '@material-ui/icons';
import React from 'react';
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

function PostActionsPane({ comments }) {
  const classes = useStyles();

  return (
    <>
      <Paper elevation={1} className={classes.ActionsPane}>
        <IconButton>
          <FavoriteBorderOutlined className={classes.LikeButton} />
        </IconButton>
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
          <form className={classes.CommentForm}>
            <TextField
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
            <IconButton>
              <Send />
            </IconButton>
          </form>
        </div>
      </Paper>
    </>
  );
}

export default PostActionsPane;
