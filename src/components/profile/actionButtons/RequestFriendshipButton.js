import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { REQUEST_FRIENDSHIP } from '../../../utils/GraphQLRequests';
import SnackbarContext from '../../../contexts/SnackbarContext';
import { catchErrorOnMutation } from '../../../utils/CommonUtils';
import { TOAST_SEVERITY_ERROR, TOAST_SEVERITY_SUCCESS } from '../../../utils/Constants';

function RequestFriendshipButton({ username, tag, refetch }) {
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );
  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const [requestFriendship, { data, error }] = useMutation(REQUEST_FRIENDSHIP);

  const handleRequestFriendship = () => {
    catchErrorOnMutation(requestFriendship, { username, tag });
  };
  React.useEffect(() => {
    if (!!error) toast(TOAST_SEVERITY_ERROR, 'Failed to send request');
  }, [error]);
  React.useEffect(() => {
    if (!data) return;
    toast(TOAST_SEVERITY_SUCCESS, `Sent friend request to ${username}#${tag}`);
    refetch();
  }, [data]);

  return (
    <Button variant="contained" color="primary" onClick={handleRequestFriendship}>
      REQUEST FRIENDSHIP
    </Button>
  );
}

export default RequestFriendshipButton;
