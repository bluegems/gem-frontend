import React from 'react';
import { Avatar, Badge, makeStyles, Typography, withStyles } from '@material-ui/core';

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

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `4px 4px 4px 4px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      width: '120%',
      height: '120%',
      borderRadius: '100%',
      border: '1px solid currentColor',
      content: '""',
    },
  },
}))(Badge);

function FriendStatus(props) {
  const classes = useStyles();

  const {
    friend: { userFirstName, userLastName, profilePicture, online },
  } = props;

  return (
    <div className={classes.FriendStatus}>
      {online ? (
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar alt={userFirstName} src={profilePicture} />
        </StyledBadge>
      ) : (
        <Avatar alt={userFirstName} src={profilePicture} />
      )}
      <Typography className={classes.UserName}>{`${userFirstName} ${userLastName}`}</Typography>
    </div>
  );
}

export default FriendStatus;
