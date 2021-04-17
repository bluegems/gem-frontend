import { Container, Grid, makeStyles } from "@material-ui/core";
import LeftPane from "../components/leftPane/LeftPane";
import NewPost from "../components/feedPane/NewPost";
import PostsFeed from "../components/feedPane/PostsFeed";
import RightPane from "../components/rightPane/RightPane";

const useStyles = makeStyles({
    left: {
        boxShadow: '5px 5px'
    },
    posts: {
        passing: '4px'
    }
})

function Feed() {
    const classes = useStyles();

    return (
        <Container maxWidth='lg'>
            <Grid container lg={12}>
                <Grid item lg={3}>
                    <LeftPane />
                </Grid>
                <Grid item lg={6}>
                    <NewPost />
                    <PostsFeed/>
                </Grid>
                <Grid item lg={3}>
                    <RightPane />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Feed;