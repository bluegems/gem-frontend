import React from 'react';
import { Button, Grid, IconButton, makeStyles, Paper, TextField } from '@material-ui/core';
import { ImageOutlined } from '@material-ui/icons';
import { useMutation } from '@apollo/client';

import { CREATE_POST } from '../../utils/GraphQLRequests';

const useStyles = makeStyles((theme) => ({
  NewPostContainer: {
    padding: theme.spacing(2),
  },
  NewPost: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  gridItem: {
    textAlign: 'center',
  },
}));

function NewPost() {
  const classes = useStyles();

  const [description, setDescription] = React.useState(null);

  const [createPost] = useMutation(CREATE_POST);

  return (
    <Paper variant="outlined" square className={classes.NewPostContainer}>
      <Paper className={classes.NewPost}>
        <form
          onSubmit={() => {
            createPost({
              variables: {
                description,
              },
            });
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={10} className={classes.gridItem}>
              <TextField
                onChange={(event) => setDescription(event.target.value)}
                id="description"
                label="Description"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={2} className={classes.gridItem}>
              <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  disableRipple
                >
                  <ImageOutlined />
                </IconButton>
              </label>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <Button
                className={classes.submit}
                type="reset"
                fullWidth
                disableRipple
                variant="outlined"
                color="primary"
              >
                Discard
              </Button>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <Button
                className={classes.submit}
                type="submit"
                fullWidth
                disableRipple
                variant="contained"
                color="primary"
              >
                Post
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Paper>
  );
}

export default NewPost;
