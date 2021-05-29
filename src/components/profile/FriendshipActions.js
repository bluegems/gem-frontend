import React from 'react';
import { Typography } from '@material-ui/core';

import AuthenticatedUserContext from '../../contexts/AuthenticatedUserContext';
import RequestFriendshipButton from './actionButtons/RequestFriendshipButton';
import AcceptFriendshipButton from './actionButtons/AcceptFriendshipButton';
import DeclineFriendshipButton from './actionButtons/DeclineFriendshipButton';
import DeleteRequestButton from './actionButtons/DeleteRequestButton';
import BlockUserButton from './actionButtons/BlockUserButton';
import UnblockUserButton from './actionButtons/UnblockUserButton';
import UnfriendUserButton from './actionButtons/UnfriendUserButton';
import {
  FRIENDSHIP_ACCEPTED,
  FRIENDSHIP_BLOCKED,
  FRIENDSHIP_DECLINED,
  FRIENDSHIP_REQUESTED,
} from '../../utils/Constants';

function FriendshipActions({ friendship, username, tag, refetch }) {
  const {
    authenticatedUserInfo: { username: contextUsername, tag: contextTag },
  } = React.useContext(AuthenticatedUserContext);
  // User is viewing his/her own profile - No actions
  const sameUser = username === contextUsername && tag === contextTag;
  if (sameUser) return null;

  // User is viewing another user's profile
  // const [friendship, setFriendship] = React.useState(currentFriendship);
  const { exists } = friendship;

  // Populate all buttons before returning
  const actionButtons = [];
  const buttonProps = {
    username,
    tag,
    // setFriendship,
    refetch,
  };

  // No friendship exists between users
  if (!exists) {
    actionButtons.push(
      <RequestFriendshipButton {...buttonProps} key="request" />,
      <BlockUserButton {...buttonProps} key="block" />
    );
    return <>{actionButtons}</>;
  }

  // A friendship entry exists between users
  const {
    status,
    modifiedBy: { username: modifiedByUsername, tag: modifiedByTag },
  } = friendship;

  if (status === FRIENDSHIP_REQUESTED) {
    // Current user has sent this user a friend request and is awaiting response
    if (modifiedByUsername === contextUsername && modifiedByTag === contextTag) {
      actionButtons.push(<DeleteRequestButton {...buttonProps} key="delete" />);
    }
    // Current user has received a request from the other user and has not responded
    if (modifiedByUsername === username && modifiedByTag === tag) {
      actionButtons.push(
        <AcceptFriendshipButton {...buttonProps} key="accept" />,
        <DeclineFriendshipButton {...buttonProps} key="decline" />
      );
    }
  }
  if (status === FRIENDSHIP_DECLINED) {
    // Current user has declined this user's friend request and can request if he/she wants to
    if (modifiedByUsername === contextUsername && modifiedByTag === contextTag) {
      actionButtons.push(<RequestFriendshipButton {...buttonProps} key="request" />);
    }
    // Current user's request has been declined by the other user and another request
    // can't be sent by the current user
    if (modifiedByUsername === username && modifiedByTag === tag) {
      actionButtons.push(
        <Typography variant="h7" key="has-declined">
          This user has declined your request
        </Typography>
      );
    }
  }
  if (status === FRIENDSHIP_BLOCKED) {
    // Current user has blocked the other user
    if (modifiedByUsername === contextUsername && modifiedByTag === contextTag) {
      actionButtons.push(<UnblockUserButton {...buttonProps} key="unblock" />);
    }
    // Current user has been blocked by the other user
    if (modifiedByUsername === username && modifiedByTag === tag) {
      actionButtons.push(
        <Typography variant="h7" key="has-blocked">
          This user has blocked you
        </Typography>
      );
    }
  }
  if (status === FRIENDSHIP_ACCEPTED) {
    actionButtons.push(<UnfriendUserButton {...buttonProps} key="unfriend" />);
  }

  // Every user can block any other user if a friendship block doesn't already exist
  if (status !== FRIENDSHIP_BLOCKED) {
    actionButtons.push(<BlockUserButton {...buttonProps} key="block" />);
  }

  return <>{actionButtons}</>;
}

export default FriendshipActions;
