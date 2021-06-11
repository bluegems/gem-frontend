import { Avatar, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  UserLink: {
    width: '30%',
    margin: theme.spacing(1),
  },
  UserPaper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(2),
  },
  UserAvatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  UserInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

function SearchResultUser({ username, tag, firstName, lastName, profilePicture }) {
  const classes = useStyles();
  return (
    <Link to={{ pathname: `/profile/${username}/${tag}` }} className={classes.UserLink}>
      <Paper className={classes.UserPaper}>
        <Avatar alt={firstName} src={String(profilePicture)} className={classes.UserAvatar} />
        <Typography variant="h6" noWrap>{`${firstName} ${lastName}`}</Typography>
        <Typography variant="body2">{`@${username}#${tag}`}</Typography>
      </Paper>
    </Link>
  );
}

export default SearchResultUser;
