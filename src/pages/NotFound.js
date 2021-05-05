import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  center: {
    textAlign: 'center',
  },
});

function NotFound() {
  const classes = useStyles();

  return <h1 className={classes.center}>Not Found</h1>;
}
export default NotFound;
