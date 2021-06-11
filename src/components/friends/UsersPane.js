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
  },
  PaneRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'sticky',
    top: theme.spacing(8),
    marginLeft: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));

function UsersPane({ users, paneHeading, emptyMessage }) {
  const classes = useStyles();

  return (
    <div className={classes.PaneRoot}>
      <Typography variant="h5">{paneHeading}</Typography>
      {!!users ? (
        <>
          {!!users.length ? (
            <div className={classes.FriendsListRoot}>
              {users.map((friend) => (
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
              <Typography style={{ color: 'gray' }}>{emptyMessage}</Typography>
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
          <Typography style={{ color: 'gray' }}>Cannot view these users</Typography>
        </div>
      )}
    </div>
  );
}

export default UsersPane;
