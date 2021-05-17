import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import { DECLINE_FRIENDSHIP } from '../../../utils/GraphQLRequests';

function DeclineFriendshipButton({ username, tag, refetch }) {
  const [declineFriendship, { data, error }] = useMutation(DECLINE_FRIENDSHIP);

  const handleDeclineFriendship = () => {
    declineFriendship({ variables: { username, tag } });
  };
  React.useEffect(() => {
    if (!data) return;
    refetch();
  }, [data, error]);

  return (
    <Button variant="outlined" color="primary" onClick={handleDeclineFriendship}>
      DECLINE FRIENDSHIP
    </Button>
  );
}

export default DeclineFriendshipButton;
