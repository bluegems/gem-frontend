import { Container, Grid, makeStyles, Paper } from '@material-ui/core';
import Logo from './Logo';
import Options from './Options';

const useStyles = makeStyles((theme) => ({
  navbar: {
    height: theme.spacing(8),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navbarContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
}));

function GemHeader() {
  const classes = useStyles();

  return (
    <Paper className={classes.navbar} square>
      <Container maxWidth="lg">
        <Grid container lg={12}>
          <Grid
            container
            direction="row"
            lg={6}
            justify="flex-start"
            alignContent="center"
          >
            <Grid item>
              <Logo height="4rem" />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            lg={6}
            justify="flex-end"
            alignContent="center"
          >
            <Grid item>
              <Options />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default GemHeader;
