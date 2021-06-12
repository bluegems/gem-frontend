import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { UNBLOCK_USER } from '../../../utils/GraphQLRequests';
import SnackbarContext from '../../../contexts/SnackbarContext';
import { TOAST_SEVERITY_ERROR, TOAST_SEVERITY_SUCCESS } from '../../../utils/Constants';

function UnblockUserButton({ username, tag, refetch }) {
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );
  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const [unblockUser, { data, error }] = useMutation(UNBLOCK_USER);

  const handleUnblockUser = () => {
    catchErrorOnMutation(unblockUser, { username, tag });
  };
  React.useEffect(() => {
    if (!!error) toast(TOAST_SEVERITY_ERROR, 'Failed to unblock user');
  }, [error]);
  React.useEffect(() => {
    if (!data) return;
    toast(TOAST_SEVERITY_SUCCESS, `Unblocked ${username}#${tag}`);
    refetch();
  }, [data]);

  return (
    <Button variant="contained" color="primary" onClick={handleUnblockUser}>
      UNBLOCK USER
    </Button>
  );
}

export default UnblockUserButton;
