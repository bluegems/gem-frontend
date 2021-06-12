import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { ACCEPT_FRIENDSHIP } from '../../../utils/GraphQLRequests';
import { catchErrorOnMutation } from '../../../utils/CommonUtils';
import SnackbarContext from '../../../contexts/SnackbarContext';
import { TOAST_SEVERITY_ERROR, TOAST_SEVERITY_SUCCESS } from '../../../utils/Constants';

function AcceptFriendshipButton({ username, tag, refetch }) {
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );
  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const [acceptFriendship, { data, error }] = useMutation(ACCEPT_FRIENDSHIP);

  const handleAcceptFriendship = () => {
    catchErrorOnMutation(acceptFriendship, { username, tag });
  };
  React.useEffect(() => {
    if (!!error) toast(TOAST_SEVERITY_ERROR, 'Failed to accept friendship');
  }, [error]);
  React.useEffect(() => {
    if (!data) return;
    toast(TOAST_SEVERITY_SUCCESS, `${username}#${tag} is now your friend`);
    refetch();
  }, [data]);

  return (
    <Button variant="contained" color="primary" onClick={handleAcceptFriendship}>
      ACCEPT FRIENDSHIP
    </Button>
  );
}

export default AcceptFriendshipButton;
