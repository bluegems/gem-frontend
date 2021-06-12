import { Avatar, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { getImgurLink } from '../../utils/CommonUtils';
import { IMGUR_SMALL_SQUARE } from '../../utils/Constants';

const useStyles = makeStyles((theme) => ({
  CommentPaper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
            <Avatar
              alt={firstName}
              src={getImgurLink(profilePicture, IMGUR_SMALL_SQUARE)}
              className={classes.UserAvatar}
            />
            <Typography variant="body2" className={classes.UserName}>{`${firstName} ${
              !!lastName ? lastName : ''
            }`}</Typography>
          </div>
          <div className={classes.CommentText}>
            <Typography variant="body1">{comment.text}</Typography>
          </div>
        </div>
      </Paper>
    )
  );
}

export default PostComment;
