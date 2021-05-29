import React from 'react';

import { makeStyles, Paper, Typography } from '@material-ui/core';
import { Block } from '@material-ui/icons';

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
      {!!posts.length ? (
        <div className={classes.postsFeed}>
          {posts.map((post) => (
            <Post key={post.id} post={post} showActions />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30vh',
          }}
        >
          <Block style={{ width: '80px', height: '80px' }} />
          <Typography style={{ color: 'gray' }}>No posts</Typography>
        </div>
      )}
    </Paper>
  ) : (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}
    >
      <Block style={{ width: '80px', height: '80px' }} />
      <Typography style={{ color: 'gray' }}>Cannot view this user&apos;s posts</Typography>
    </div>
  );
}

export default PostsFeed;
