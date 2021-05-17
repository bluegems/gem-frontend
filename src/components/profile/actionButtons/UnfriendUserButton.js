import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { UNFRIEND_USER } from '../../../utils/GraphQLRequests';

function UnfriendUserButton({ username, tag, refetch }) {
  const [unfriendUser, { data, error }] = useMutation(UNFRIEND_USER);

  const handleUnfriendUser = () => {
    unfriendUser({ variables: { username, tag } });
  };
  React.useEffect(() => {
    if (!data) return;
    refetch();
  }, [data, error]);

  return (
    <Button variant="outlined" color="secondary" onClick={handleUnfriendUser}>
      UNFRIEND USER
    </Button>
  );
}

export default UnfriendUserButton;
