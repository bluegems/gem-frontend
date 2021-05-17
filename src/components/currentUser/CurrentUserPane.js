// React
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// 3rd party
import { Avatar, Button, Grid, makeStyles, Typography } from '@material-ui/core';
// Custom
import AuthenticatedUserContext from '../../contexts/AuthenticatedUserContext';
import EditProfile from '../dialogue/EditProfile';

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
    fontSize: Number(theme.spacing(5)),
  },
  UserDetails: {
    marginLeft: theme.spacing(2),
  },
  Bio: {
    margin: theme.spacing(1),
  },
  UserButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
}));

function LeftPane() {
  const classes = useStyles();

  const {
    authenticatedUserInfo: { username, tag, firstName, lastName, bio, profilePicture },
  } = useContext(AuthenticatedUserContext);

  return (
    <div className={classes.UserInfo}>
      <div className={classes.UserInfoNested}>
        <div>
          <Avatar alt={firstName} src={String(profilePicture)} className={classes.UserAvatar} />
        </div>
        <div className={classes.UserDetails}>
          <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
          <Typography variant="body2">{`@${username}#${tag}`}</Typography>
        </div>
      </div>
      <div className={classes.Bio}>
        <Typography variant="body1">{`"${bio}"`}</Typography>
      </div>
      <Grid container className={classes.UserButtons}>
        <Grid item>
          <EditProfile />
        </Grid>
        <Grid item>
          <Link to={{ pathname: `/profile/${username}/${tag}`}}>
            <Button variant="outlined" color="primary">
              View Profile
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default LeftPane;
