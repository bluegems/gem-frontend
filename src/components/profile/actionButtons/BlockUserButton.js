import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { BLOCK_USER } from '../../../utils/GraphQLRequests';

function BlockUserButton({ username, tag, refetch }) {
  const [blockUser, { data, error }] = useMutation(BLOCK_USER);

  const handleBlockUser = () => {
    blockUser({ variables: { username, tag } });
  };
  React.useEffect(() => {
    if (!data) return;
    refetch();
  }, [data, error]);

  return (
    <Button variant="outlined" color="secondary" onClick={handleBlockUser}>
      BLOCK USER
    </Button>
  );
}

export default BlockUserButton;
