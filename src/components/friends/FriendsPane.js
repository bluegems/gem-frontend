import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { Block } from '@material-ui/icons';
import FriendStatus from './FriendStatus';

const useStyles = makeStyles((theme) => ({
  FriendsListRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    position: 'sticky',
    top: theme.spacing(8),
    marginLeft: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));

function FriendsPane({ friends }) {
  const classes = useStyles();

  return !!friends ? (
    <>
      {!!friends.length ? (
        <div className={classes.FriendsListRoot}>
          {friends.map((friend) => (
            <Link
              to={{ pathname: `/profile/${friend.username}/${friend.tag}` }}
              key={`${friend.username}#${friend.tag}`}
            >
              <FriendStatus friend={friend} />
            </Link>
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
          <Typography style={{ color: 'gray' }}>No friends</Typography>
        </div>
      )}
    </>
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
      <Typography style={{ color: 'gray' }}>Cannot view this user&apos;s friends</Typography>
    </div>
  );
}

export default FriendsPane;
