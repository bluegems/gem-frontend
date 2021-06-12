import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { BLOCK_USER } from '../../../utils/GraphQLRequests';
import SnackbarContext from '../../../contexts/SnackbarContext';
import { catchErrorOnMutation } from '../../../utils/CommonUtils';
import { TOAST_SEVERITY_ERROR, TOAST_SEVERITY_SUCCESS } from '../../../utils/Constants';

function BlockUserButton({ username, tag, refetch }) {
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );
  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const [blockUser, { data, error }] = useMutation(BLOCK_USER);

  const handleBlockUser = () => {
    catchErrorOnMutation(blockUser, { username, tag });
  };
  React.useEffect(() => {
    if (!!error) toast(TOAST_SEVERITY_ERROR, 'Failed to block user');
  }, [error]);
  React.useEffect(() => {
    if (!data) return;
    toast(TOAST_SEVERITY_SUCCESS, `${username}#${tag} is now blocked by you`);
    refetch();
  }, [data]);

  return (
    <Button variant="outlined" color="secondary" onClick={handleBlockUser}>
      BLOCK USER
    </Button>
  );
}

export default BlockUserButton;
