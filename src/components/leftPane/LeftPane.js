import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        position: 'sticky',
        marginRight: '4px',
        borderRight: 'black 1px'
    }
})

function LeftPane() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <p>Left pane</p>
        </Grid>
    )
}

export default LeftPane;
