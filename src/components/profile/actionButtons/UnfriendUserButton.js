import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { UNFRIEND_USER } from '../../../utils/GraphQLRequests';
import SnackbarContext from '../../../contexts/SnackbarContext';
import { catchErrorOnMutation } from '../../../utils/CommonUtils';
import { TOAST_SEVERITY_ERROR, TOAST_SEVERITY_SUCCESS } from '../../../utils/Constants';

function UnfriendUserButton({ username, tag, refetch }) {
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );
  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const [unfriendUser, { data, error }] = useMutation(UNFRIEND_USER);

  const handleUnfriendUser = () => {
    catchErrorOnMutation(unfriendUser, { username, tag });
  };
  React.useEffect(() => {
    if (!!error) toast(TOAST_SEVERITY_ERROR, 'Failed to unfriend user');
  }, [error]);
  React.useEffect(() => {
    if (!data) return;
    toast(TOAST_SEVERITY_SUCCESS, `${username}#${tag} is no longer your friend`);
    refetch();
  }, [data]);

  return (
    <Button variant="outlined" color="secondary" onClick={handleUnfriendUser}>
      UNFRIEND USER
    </Button>
  );
}

export default UnfriendUserButton;
