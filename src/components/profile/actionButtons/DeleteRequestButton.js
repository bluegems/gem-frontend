import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { DELETE_REQUEST } from '../../../utils/GraphQLRequests';
import SnackbarContext from '../../../contexts/SnackbarContext';
import { catchErrorOnMutation } from '../../../utils/CommonUtils';
import { TOAST_SEVERITY_ERROR, TOAST_SEVERITY_SUCCESS } from '../../../utils/Constants';

function DeleteRequestButton({ username, tag, refetch }) {
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );
  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const [deleteRequest, { data, error }] = useMutation(DELETE_REQUEST);

  const handleDeleteRequest = () => {
    catchErrorOnMutation(deleteRequest, { username, tag });
  };
  React.useEffect(() => {
    if (!!error) toast(TOAST_SEVERITY_ERROR, 'Failed to delete request');
  }, [error]);
  React.useEffect(() => {
    if (!data) return;
    toast(TOAST_SEVERITY_SUCCESS, `Deleted friend request for ${username}#${tag}`);
    refetch();
  }, [data]);

  return (
    <Button variant="outlined" color="primary" onClick={handleDeleteRequest}>
      DELETE REQUEST
    </Button>
  );
}

export default DeleteRequestButton;
