import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { DECLINE_FRIENDSHIP } from '../../../utils/GraphQLRequests';
import SnackbarContext from '../../../contexts/SnackbarContext';
import { TOAST_SEVERITY_ERROR, TOAST_SEVERITY_SUCCESS } from '../../../utils/Constants';

function DeclineFriendshipButton({ username, tag, refetch }) {
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );
  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const [declineFriendship, { data, error }] = useMutation(DECLINE_FRIENDSHIP);

  const handleDeclineFriendship = () => {
    catchErrorOnMutation(declineFriendship, { username, tag });
  };
  React.useEffect(() => {
    if (!!error) toast(TOAST_SEVERITY_ERROR, 'Failed to decline friendship');
  }, [error]);
  React.useEffect(() => {
    if (!data) return;
    toast(TOAST_SEVERITY_SUCCESS, `Declined friendship from ${username}#${tag}`);
    refetch();
  }, [data]);

  return (
    <Button variant="outlined" color="primary" onClick={handleDeclineFriendship}>
      DECLINE FRIENDSHIP
    </Button>
  );
}

export default DeclineFriendshipButton;
