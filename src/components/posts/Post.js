import React from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { FavoriteBorderOutlined, InsertCommentOutlined } from '@material-ui/icons';
import { dateToString } from '../../utils/CommonUtils';

const useStyles = makeStyles((theme) => ({
  Post: {
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
      description,
      image,
      modifiedDatetime,
      user: { username, tag, firstName: userFirstName, lastName: userLastName, profilePicture },
    },
  } = props;
  const date = new Date(Date.parse(modifiedDatetime));

  const imageExists = image && image !== null && image.length !== 0;
  const descriptionExists = description && description !== null && description.length !== 0;

  return imageExists || descriptionExists ? (
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
      {imageExists ? <CardMedia component="img" image={image} /> : null}
      {descriptionExists ? (
        <CardContent>
          <Typography variant="body2" component="h3">
            {description}
          </Typography>
        </CardContent>
      ) : null}
      <CardActions>
        <IconButton>
          <FavoriteBorderOutlined />
        </IconButton>
        <IconButton>
          <InsertCommentOutlined />
        </IconButton>
      </CardActions>
      <Typography variant="overline" className={classes.Date}>
        {dateToString(date)}
      </Typography>
    </Card>
  ) : null;
}

export default Post;
