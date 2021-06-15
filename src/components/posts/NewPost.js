import { useMutation } from '@apollo/client';
import { Avatar, Button, Grid, IconButton, makeStyles, Paper, TextField } from '@material-ui/core';
import { ImageOutlined } from '@material-ui/icons';
import React from 'react';
import SnackbarContext from '../../contexts/SnackbarContext';
import { catchErrorOnMutation, isValidImageFile, isValidSize } from '../../utils/CommonUtils';
import {
  IMGUR_UPLOAD_LIMIT_MB,
  TOAST_SEVERITY_ERROR,
  TOAST_SEVERITY_SUCCESS,
} from '../../utils/Constants';
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

  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = React.useContext(
    SnackbarContext
  );

  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState('');

  const [createPost, { data: createPostData, error: createPostError }] = useMutation(CREATE_POST);

  const toast = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const resetImage = async () => {
    await setImage(null);
    await setImageUrl('');
  };

  const handleReset = async () => {
    await setDescription('');
    await resetImage();
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!isValidImageFile(file)) {
      resetImage();
      toast(TOAST_SEVERITY_ERROR, 'Upload jpeg, jpg or png');
      return;
    }
    if (!isValidSize(file, IMGUR_UPLOAD_LIMIT_MB)) {
      resetImage();
      toast(TOAST_SEVERITY_ERROR, `Upload image less than ${IMGUR_UPLOAD_LIMIT_MB} MB`);
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      setImageUrl(reader.result);
      setImage({
        base64String,
        filename: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    if (!!createPostError) {
      handleReset();
      toast(TOAST_SEVERITY_ERROR, 'Failed to create post');
    }
  }, [createPostError]);
  React.useEffect(() => {
    if (!createPostData) return;
    handleReset();
    toast(TOAST_SEVERITY_SUCCESS, 'Created new post');
  }, [createPostData]);

  const isEmptyPost = () => !!description || !!image;

  return (
    <Paper variant="outlined" square className={classes.NewPostContainer}>
      <Paper className={classes.NewPost}>
        <form
          autoComplete="off"
          onSubmit={async (event) => {
            event.preventDefault();
            await catchErrorOnMutation(createPost, { description, image });
            handleReset();
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
              <input
                onChange={handleImageUpload}
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  disableRipple
                >
                  {!imageUrl ? <ImageOutlined /> : <Avatar src={imageUrl} />}
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
                onClick={handleReset}
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
                disabled={!isEmptyPost()}
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
