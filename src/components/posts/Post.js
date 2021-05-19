import React from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { dateToString } from '../../utils/CommonUtils';

const useStyles = makeStyles((theme) => ({
  Post: {
    width: `calc(100% - ${theme.spacing(4)}px)`,
    margin: theme.spacing(2),
    position: 'relative',
  },
  UserAvatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  Date: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: theme.spacing(2),
  },
}));

function Post(props) {
  const classes = useStyles();

  const {
    post: {
      id: postId,
      description,
      image,
      modifiedDatetime,
      user: { username, tag, firstName: userFirstName, lastName: userLastName, profilePicture },
    },
  } = props;
  const date = new Date(Date.parse(modifiedDatetime));

  return !!image || !!description ? (
    <Card className={classes.Post}>
      <Link to={{ pathname: `/profile/${username}/${tag}` }}>
        <CardHeader
          avatar={
            <Avatar
              alt={userFirstName}
              src={String(profilePicture)}
              className={classes.UserAvatar}
            />
          }
          title={`${userFirstName} ${userLastName}`}
          subheader={`@${username}#${tag}`}
        />
      </Link>
      <Link to={{ pathname: `/post/${postId}` }}>
        {!!description ? (
          <CardContent>
            <Typography variant="body2" component="h3">
              {description}
            </Typography>
          </CardContent>
        ) : null}
        {!!image ? <CardMedia component="img" image={image} /> : null}
      </Link>
      <Typography variant="overline" className={classes.Date}>
        {dateToString(date)}
      </Typography>
    </Card>
  ) : null;
}

export default Post;
