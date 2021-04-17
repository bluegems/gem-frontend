import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Typography } from "@material-ui/core";
import { FavoriteBorderOutlined, InsertCommentOutlined } from "@material-ui/icons";
import { dateToString } from "../../utils/CommonUtils";

const useStyles = makeStyles((theme) => ({
    Post: {
        margin: theme.spacing(2),
        position: 'relative'
    },
    UserAvatar: {
        width: theme.spacing(6),
        height: theme.spacing(6)
    },
    Date: {
        position: 'absolute',
        right: 0,
        top: 0,
        margin: theme.spacing(2)
    }
}))

function Post(props) {
    const classes = useStyles();

    const { userFirstName, username, userAvatar, image, description, date } = props.post;
    const imageExists = (image && image!==null && image.length!==0);
    const descriptionExists = (description && description!==null && description.length!==0);
    return (
            ( imageExists || descriptionExists ) ?
            <Card className={classes.Post}>
                <CardHeader
                    avatar={
                        <Avatar alt={userFirstName} src={userAvatar} className={classes.UserAvatar}/>
                    }
                    title={userFirstName}
                    subheader={`@${username}`}
                />
                {
                    imageExists ?
                    <CardMedia
                        component='img'
                        image={image}
                        title='Image sample'
                    />
                    : null
                }
                {
                    descriptionExists ?
                    <CardContent>
                        <Typography variant='body2' component='h3'>
                            {description}
                        </Typography>
                    </CardContent>
                    : null
                }
                <CardActions>
                    <IconButton>
                        <FavoriteBorderOutlined />
                    </IconButton>
                    <IconButton>
                        <InsertCommentOutlined />
                    </IconButton>
                </CardActions>
                <Typography variant='overline' className={classes.Date}>{dateToString(date)}</Typography>
            </Card>
            : null
    )
}

export default Post;
