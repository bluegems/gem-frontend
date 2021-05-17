import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { UNBLOCK_USER } from '../../../utils/GraphQLRequests';

function UnblockUserButton({ username, tag, refetch }) {
  const [unblockUser, { data, error }] = useMutation(UNBLOCK_USER);

  const handleUnblockUser = () => {
    unblockUser({ variables: { username, tag } });
  };
  React.useEffect(() => {
    if (!data) return;
    refetch();
  }, [data, error]);

  return (
    <Button variant="contained" color="primary" onClick={handleUnblockUser}>
      UNBLOCK USER
    </Button>
  );
}

export default UnblockUserButton;
