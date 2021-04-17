import { makeStyles, Paper } from "@material-ui/core";
import Post from "./Post";

const useStyles = makeStyles((theme) => ({
    postsFeed: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: theme.spacing(2)
    }
}))

function PostsFeed() {

    const classes = useStyles();

    const currentDate = new Date();

    const posts = [
        {
            userFirstName: 'Keerthi',
            username: 'keevee',
            userAvatar: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/7d13c5f2-28c5-468e-9d9b-f0048ce7921b/dbcggif-9666f255-a98c-4a24-81d3-195903327124.png",
            image: 'https://images.unsplash.com/photo-1617129936634-06cd10f4497f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1317&q=80',
            description: 'Best trip of me life YAY',
            date: currentDate
        },
        {
            userFirstName: 'Shreya',
            username: 'shran',
            userAvatar: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/7d13c5f2-28c5-468e-9d9b-f0048ce7921b/dbcgfy8-c910d8e7-f3a4-4b39-b1be-49806742b25c.png",
            image: 'https://images.unsplash.com/photo-1590808100071-3654286139a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            date: currentDate
        },
        {
            userFirstName: 'Susmitha',
            username: 'susu',
            userAvatar: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ac7d183b-035e-4133-8302-bcc92a267aa7/de39xro-99cc65ba-171c-40f9-be66-46e7e0abc116.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYWM3ZDE4M2ItMDM1ZS00MTMzLTgzMDItYmNjOTJhMjY3YWE3XC9kZTM5eHJvLTk5Y2M2NWJhLTE3MWMtNDBmOS1iZTY2LTQ2ZTdlMGFiYzExNi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.MAbGFurj4rqE2jQj3YEpQ4e6xMdRGwc1m__UUJyIp-U",
            description: 'I don\'t talk a lot',
            date: currentDate
        },
        {
            userFirstName: 'Parinith',
            username: 'parinithshekar',
            userAvatar: "https://i.pinimg.com/564x/5a/5f/47/5a5f473c8020387ec2ddad40f0cfea3f.jpg",
            description: 'Antarctica seems pretty NICE!',
            image: 'https://images.unsplash.com/photo-1556918936-216daf8e7c4c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            date: currentDate
        }
    ]

    return (
        <Paper variant='outlined' square>
            <div className={classes.postsFeed}>
                {
                    posts.map(post => 
                        <Post post={post} />
                        // <p>{post.username}</p>
                    )
                }
            </div>
        </Paper>
    )
}

export default PostsFeed;
