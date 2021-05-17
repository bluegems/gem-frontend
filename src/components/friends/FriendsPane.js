import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import FriendStatus from './FriendStatus';
import AuthenticatedUserContext from '../../contexts/AuthenticatedUserContext';

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
    <p>Cannot view this user&apos;s friends</p>
  );
}

export default FriendsPane;
