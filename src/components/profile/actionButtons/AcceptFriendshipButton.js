import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { ACCEPT_FRIENDSHIP } from '../../../utils/GraphQLRequests';

function AcceptFriendshipButton({ username, tag, refetch }) {
  const [acceptFriendship, { data, error }] = useMutation(ACCEPT_FRIENDSHIP);

  const handleAcceptFriendship = () => {
    acceptFriendship({ variables: { username, tag } });
  };
  React.useEffect(() => {
    if (!data) return;
    refetch();
  }, [data, error]);

  return (
    <Button variant="contained" color="primary" onClick={handleAcceptFriendship}>
      ACCEPT FRIENDSHIP
    </Button>
  );
}

export default AcceptFriendshipButton;
