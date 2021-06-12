import React from 'react';
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { getImgurLink } from '../../utils/CommonUtils';
import { IMGUR_SMALL_SQUARE } from '../../utils/Constants';

const useStyles = makeStyles((theme) => ({
  FriendStatus: {
    margin: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  UserName: {
    paddingLeft: theme.spacing(1),
  },
}));

function FriendStatus(props) {
  const classes = useStyles();

  const {
    friend: { firstName: userFirstName, lastName: userLastName, profilePicture },
  } = props;

  return (
    <div className={classes.FriendStatus}>
      <Avatar alt={userFirstName} src={getImgurLink(profilePicture, IMGUR_SMALL_SQUARE)} />
      <Typography className={classes.UserName}>{`${userFirstName} ${userLastName}`}</Typography>
    </div>
  );
}

export default FriendStatus;
