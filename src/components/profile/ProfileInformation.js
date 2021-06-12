import { Avatar, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { getImgurLink } from '../../utils/CommonUtils';
import { IMGUR_MEDIUM_THUMBNAIL } from '../../utils/Constants';
import FriendshipActions from './FriendshipActions';

const useStyles = makeStyles((theme) => ({
  UserAvatar: {
    width: theme.spacing(26),
    height: theme.spacing(26),
    fontSize: Number(theme.spacing(13)),
  },
  PaperContainer: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  PersonalInformationContainer: {
    display: 'flex',
  },
  NamesContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: theme.spacing(3),
  },
  ActionButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}));

function ProfileInformation({ posts, friends, refetch, ...userInformation }) {
  const classes = useStyles();
  const { username, tag, firstName, lastName, bio, profilePicture } = userInformation;

  return (
    <Paper elevation={0} className={classes.PaperContainer}>
      <Grid container>
        <Grid item lg={9} className={classes.PersonalInformationContainer}>
          <Avatar
            alt={firstName}
            src={getImgurLink(profilePicture, IMGUR_MEDIUM_THUMBNAIL)}
            className={classes.UserAvatar}
          />
          <div className={classes.NamesContainer}>
            <div>
              <Typography variant="h2">{`${firstName} ${lastName}`}</Typography>
              <Typography variant="body1">{`@${username}#${tag}`}</Typography>
            </div>
            {!!bio && (
              <>
                <Divider variant="middle" />
                <Typography variant="h5">{`"${bio}"`}</Typography>
              </>
            )}
          </div>
        </Grid>
        <Grid item lg={3} className={classes.ActionButtonsContainer}>
          <FriendshipActions
            friendship={userInformation.friendship}
            username={username}
            tag={tag}
            refetch={refetch}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProfileInformation;
