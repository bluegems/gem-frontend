import React from 'react';

import { makeStyles, Paper } from '@material-ui/core';

import Post from './Post';

const useStyles = makeStyles((theme) => ({
  postsFeed: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: theme.spacing(2),
  },
}));

function PostsFeed({ posts }) {
  const classes = useStyles();

  return !!posts ? (
    <Paper variant="outlined" square>
      <div className={classes.postsFeed}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </Paper>
  ) : (
    <p>Cannot view this user&apos;s posts</p>
  );
}

export default PostsFeed;
