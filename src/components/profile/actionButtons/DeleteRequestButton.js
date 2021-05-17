import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { DELETE_REQUEST } from '../../../utils/GraphQLRequests';

function DeleteRequestButton({ username, tag, refetch }) {
  const [deleteRequest, { data, error }] = useMutation(DELETE_REQUEST);

  const handleDeleteRequest = () => {
    deleteRequest({ variables: { username, tag } });
  };
  React.useEffect(() => {
    if (!data) return;
    refetch();
  }, [data, error]);

  return (
    <Button variant="outlined" color="primary" onClick={handleDeleteRequest}>
      DELETE REQUEST
    </Button>
  );
}

export default DeleteRequestButton;
