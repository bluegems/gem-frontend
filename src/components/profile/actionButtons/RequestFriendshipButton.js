import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { REQUEST_FRIENDSHIP } from '../../../utils/GraphQLRequests';

function RequestFriendshipButton({ username, tag, refetch }) {
  const [requestFriendship, { data, error }] = useMutation(REQUEST_FRIENDSHIP);

  const handleRequestFriendship = () => {
    requestFriendship({ variables: { username, tag } });
  };
  React.useEffect(() => {
    if (!data) return;
    refetch();
  }, [data, error]);

  return (
    <Button variant="contained" color="primary" onClick={handleRequestFriendship}>
      REQUEST FRIENDSHIP
    </Button>
  );
}

export default RequestFriendshipButton;
