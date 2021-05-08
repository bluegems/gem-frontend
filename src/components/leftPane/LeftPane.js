import React, { useContext } from 'react';
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import AuthenticatedUserContext from '../../contexts/AuthenticatedUserContext';

const useStyles = makeStyles((theme) => ({
  UserInfo: {
    position: 'sticky',
    top: theme.spacing(8),
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  UserInfoNested: {
    display: 'flex',
    justifyItems: 'flex-start',
    alignItems: 'center',
  },
  UserAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  UserDetails: {
    marginLeft: theme.spacing(2),
  },
  Bio: {
    margin: theme.spacing(1),
  },
}));

function LeftPane() {
  const classes = useStyles();

  const { username, tag, firstName, lastName, bio, profilePicture } = useContext(
    AuthenticatedUserContext
  );

  return (
    <div className={classes.UserInfo}>
      <div className={classes.UserInfoNested}>
        <div>
          <Avatar alt={firstName} src={profilePicture} className={classes.UserAvatar} />
        </div>
        <div className={classes.UserDetails}>
          <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
          <Typography variant="body2">{`@${username}#${tag}`}</Typography>
        </div>
      </div>
      <div className={classes.Bio}>
        <Typography variant="body1">{`"${bio}"`}</Typography>
      </div>
    </div>
  );
}

export default LeftPane;
