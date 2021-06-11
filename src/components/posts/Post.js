import { useMutation } from '@apollo/client';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Favorite, FavoriteBorderOutlined, InsertCommentOutlined } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { dateToString, getImgurLink } from '../../utils/CommonUtils';
import { IMGUR_LARGE_THUMBNAIL, IMGUR_SMALL_SQUARE } from '../../utils/Constants';
import { LIKE_POST, UNLIKE_POST } from '../../utils/GraphQLRequests';
import { ConditionalLink } from '../../utils/LinkUtils';

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
      isLiked,
      modifiedDatetime,
      user: { username, tag, firstName: userFirstName, lastName: userLastName, profilePicture },
    },
    showActions,
    linkProfile,
    linkPost,
  } = props;
  const date = new Date(Date.parse(modifiedDatetime));

  const [postIsLiked, setPostIsLiked] = React.useState(isLiked);
  const [likePost, { data: likePostData, error: likePostError }] = useMutation(LIKE_POST);
  const [unlikePost, { data: unlikePostData, error: unlikePostError }] = useMutation(UNLIKE_POST);

  React.useEffect(() => {
    if (likePostError || unlikePostError) return;
    if (!!likePostData) {
      console.log('IS LIKED : ', likePostData.likePost.isLiked);
      setPostIsLiked(likePostData.likePost.isLiked);
    }
  }, [likePostData, likePostError]);

  React.useEffect(() => {
    if (unlikePostError) return;
    if (!!unlikePostData) {
      console.log('IS LIKED : ', unlikePostData.unlikePost.isLiked);
      setPostIsLiked(unlikePostData.unlikePost.isLiked);
    }
  }, [unlikePostData, unlikePostError]);

  const handleLike = () => {
    console.log(postIsLiked);
    return !!postIsLiked
      ? unlikePost({ variables: { id: postId } })
      : likePost({ variables: { id: postId } });
  };

  return !!image || !!description ? (
    <Card className={classes.Post}>
      <ConditionalLink to={{ pathname: `/profile/${username}/${tag}` }} condition={!!linkProfile}>
        <CardHeader
          avatar={
            <Avatar
              alt={userFirstName}
              src={getImgurLink(profilePicture, IMGUR_SMALL_SQUARE)}
              className={classes.UserAvatar}
            />
          }
          title={`${userFirstName} ${userLastName}`}
          subheader={`@${username}#${tag}`}
        />
      </ConditionalLink>
      <ConditionalLink to={{ pathname: `/post/${postId}` }} condition={!!linkPost}>
        {!!description ? (
          <CardContent>
            <Typography variant="body2" component="h3">
              {description}
            </Typography>
          </CardContent>
        ) : null}
        {!!image ? (
          <CardMedia component="img" image={getImgurLink(image, IMGUR_LARGE_THUMBNAIL)} />
        ) : null}
      </ConditionalLink>
      {!!showActions && (
        <CardActions>
          <Button onClick={handleLike}>
            {!!postIsLiked ? (
              <Favorite className={classes.LikeButton} color="secondary" />
            ) : (
              <FavoriteBorderOutlined className={classes.LikeButton} />
            )}
          </Button>
          <Link to={{ pathname: `/post/${postId}` }}>
            <Button>
              <InsertCommentOutlined />
            </Button>
          </Link>
        </CardActions>
      )}
      <Typography variant="overline" className={classes.Date}>
        {dateToString(date)}
      </Typography>
    </Card>
  ) : null;
}

export default Post;
