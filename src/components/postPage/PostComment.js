import { Avatar, Chip, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  CommentPaper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  CommentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  CommentUser: {
    display: 'flex',
    alignItems: 'center',
  },
  UserAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  UserName: {
    marginLeft: theme.spacing(1),
  },
  CommentText: {
    display: 'flex',
    marginTop: theme.spacing(1),
  },
}));

function PostComment({ comment }) {
  const classes = useStyles();

  const {
    user: { firstName, lastName, profilePicture },
  } = comment;
  return (
    !!comment && (
      <Paper variant="outlined" className={classes.CommentPaper}>
        <div className={classes.CommentContainer}>
          <div className={classes.CommentUser}>
            <Avatar alt={firstName} src={String(profilePicture)} className={classes.UserAvatar} />
            <Typography
              variant="h7"
              className={classes.UserName}
            >{`${firstName} ${lastName}`}</Typography>
          </div>
          <div className={classes.CommentText}>
            <Typography variant="body2">{comment.text}</Typography>
          </div>
        </div>
      </Paper>
    )
  );
}

export default PostComment;