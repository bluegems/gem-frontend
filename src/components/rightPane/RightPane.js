import { makeStyles } from '@material-ui/core';
import FriendStatus from './FriendStatus';

const useStyles = makeStyles((theme) => ({
  FriendsListRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    position: 'sticky',
    top: theme.spacing(8),
    marginLeft: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));

function RightPane() {
  const classes = useStyles();

  const friends = [
    {
      userFirstName: 'Keerthi',
      userLastName: 'Varumbudy',
      username: 'keevee',
      profilePicture:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/7d13c5f2-28c5-468e-9d9b-f0048ce7921b/dbcggif-9666f255-a98c-4a24-81d3-195903327124.png',
      online: true,
    },
    {
      userFirstName: 'Shreya',
      userLastName: 'AN',
      username: 'shran',
      profilePicture:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/7d13c5f2-28c5-468e-9d9b-f0048ce7921b/dbcgfy8-c910d8e7-f3a4-4b39-b1be-49806742b25c.png',
      online: true,
    },
    {
      userFirstName: 'Susmitha',
      userLastName: 'S',
      username: 'susu',
      profilePicture:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ac7d183b-035e-4133-8302-bcc92a267aa7/de39xro-99cc65ba-171c-40f9-be66-46e7e0abc116.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYWM3ZDE4M2ItMDM1ZS00MTMzLTgzMDItYmNjOTJhMjY3YWE3XC9kZTM5eHJvLTk5Y2M2NWJhLTE3MWMtNDBmOS1iZTY2LTQ2ZTdlMGFiYzExNi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.MAbGFurj4rqE2jQj3YEpQ4e6xMdRGwc1m__UUJyIp-U',
      online: false,
    },
    {
      userFirstName: 'Anand',
      userLastName: 'Chembarpu',
      username: 'darhk',
      profilePicture:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBKpA2-pduF5MHqn7bk1rxaSHGoIjafQAMvDY_6k7CiXeOwIcKaxzjwJTpeHxAQhr0Sv0&usqp=CAU',
      online: false,
    },
  ];

  return (
    <div className={classes.FriendsListRoot}>
      {friends.map((friend) => (
        <FriendStatus friend={friend} />
      ))}
    </div>
  );
}

export default RightPane;
