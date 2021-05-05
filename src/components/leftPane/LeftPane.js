import { Avatar, makeStyles, Typography } from '@material-ui/core';

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

function LeftPane(props) {
  const classes = useStyles();

  const {
    userFirstName,
    userLastName,
    username,
    tag,
    profilePicture,
    bio,
  } = props.user;

  return (
    <div className={classes.UserInfo}>
      <div className={classes.UserInfoNested}>
        <div>
          <Avatar
            alt={userFirstName}
            src={profilePicture}
            className={classes.UserAvatar}
          />
        </div>
        <div className={classes.UserDetails}>
          <Typography variant="h6">{`${userFirstName} ${userLastName}`}</Typography>
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
