import { useMutation } from '@apollo/client';
import { Avatar, Button, Divider, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import AuthenticatedUserContext from '../../contexts/AuthenticatedUserContext';
import SnackbarContext from '../../contexts/SnackbarContext';
import {
  catchErrorOnMutation,
  getImgurLink,
  isValidImageFile,
  isValidSize,
} from '../../utils/CommonUtils';
import {
  IMGUR_MEDIUM_THUMBNAIL,
  IMGUR_UPLOAD_LIMIT_MB,
  TOAST_SEVERITY_ERROR,
  TOAST_SEVERITY_SUCCESS,
} from '../../utils/Constants';
import { UPDATE_PROFILE_INFORMATION } from '../../utils/GraphQLRequests';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  GridContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  ImageAndBio: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'space-between',
  },
  Label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  UserAvatar: {
    width: theme.spacing(26),
    height: theme.spacing(26),
    fontSize: Number(theme.spacing(13)),
  },
}));

function EditPersonalInformation({ closeDialog }) {
  const classes = useStyles();

  const { authenticatedUserInfo, setAuthenticatedUserInfo } = useContext(AuthenticatedUserContext);
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

  const {
    username: contextUsername,
    tag: contextTag,
    firstName: contextFirstName,
    lastName: contextLastName,
    bio: contextBio,
    profilePicture: contextProfilePicture,
  } = authenticatedUserInfo;

  const [stateUsername, setStateUsername] = React.useState(contextUsername);
  const [stateTag, setStateTag] = React.useState(contextTag);
  const [stateFirstName, setStateFirstName] = React.useState(contextFirstName);
  const [stateLastName, setStateLastName] = React.useState(
    !!contextLastName ? contextLastName : ''
  );
  const [stateBio, setStateBio] = React.useState(!!contextBio ? contextBio : '');

  const [stateProfilePicture, setStateProfilePicture] = React.useState(null);
  const [stateProfilePictureUrl, setStateProfilePictureUrl] = React.useState('');
  const [keepPreviousPicture, setKeepPreviousPicture] = React.useState(true);

  const infoHasChanged = () => {
    const hasChanged =
      contextUsername !== stateUsername ||
      contextTag !== stateTag ||
      contextFirstName !== stateFirstName ||
      (!!contextLastName ? contextLastName : '') !== stateLastName ||
      (!!contextBio ? contextBio : '') !== stateBio ||
      !keepPreviousPicture;
    return hasChanged;
  };

  const toast = (severity, message) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleRemovePicture = () => {
    // If picture was empty before, keepPrevious=true
    setKeepPreviousPicture(!contextProfilePicture);
    // Remove new profile picture
    setStateProfilePicture(null);
    setStateProfilePictureUrl('');
  };

  const resetProfilePicture = () => {
    // Keep old profile picture
    setKeepPreviousPicture(true);
    // Remove new profile picture
    setStateProfilePicture(null);
    setStateProfilePictureUrl('');
  };

  const handleReset = () => {
    resetProfilePicture();
    setStateUsername(contextUsername);
    setStateTag(contextTag);
    setStateFirstName(contextFirstName);
    setStateLastName(!!contextLastName ? contextLastName : '');
    setStateBio(!!contextBio ? contextBio : '');
  };

  const handleProfilePictureUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!isValidImageFile(file)) {
      resetProfilePicture();
      toast(TOAST_SEVERITY_ERROR, 'Upload jpeg, jpg or png');
      return;
    }
    if (!isValidSize(file, IMGUR_UPLOAD_LIMIT_MB)) {
      resetProfilePicture();
      toast(TOAST_SEVERITY_ERROR, `Upload image less than ${IMGUR_UPLOAD_LIMIT_MB} MB`);
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      setStateProfilePictureUrl(reader.result);
      setStateProfilePicture({
        base64String,
        filename: file.name,
      });
      setKeepPreviousPicture(false);
    };
    reader.readAsDataURL(file);
  };

  const [updateUser, { data: updateUserData, error: updateUserError }] = useMutation(
    UPDATE_PROFILE_INFORMATION
  );

  React.useEffect(() => {
    if (!!updateUserError) {
      handleReset();
      toast(TOAST_SEVERITY_ERROR, 'Failed to update profile');
      closeDialog();
    }
  }, [updateUserError]);
  React.useEffect(async () => {
    if (!updateUserData) return;
    toast(TOAST_SEVERITY_SUCCESS, 'User profile updated');
    await setAuthenticatedUserInfo({ ...authenticatedUserInfo, ...updateUserData.updateUser });
    closeDialog();
  }, [updateUserData]);

  return (
    <form
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        await catchErrorOnMutation(updateUser, {
          username: stateUsername,
          tag: stateTag,
          firstName: stateFirstName,
          lastName: stateLastName,
          bio: stateBio,
          profilePicture: stateProfilePicture,
          keepPreviousPicture,
        });
      }}
    >
      <Grid container className={classes.GridContainer} spacing={1}>
        <Grid item lg={12} className={classes.ImageAndBio}>
          <input
            accept="image/*"
            className={classes.input}
            id="profile-picture"
            type="file"
            onChange={handleProfilePictureUpload}
          />
          <label htmlFor="profile-picture" className={classes.Label}>
            {!!keepPreviousPicture ? (
              <Avatar
                alt={stateFirstName}
                src={getImgurLink(contextProfilePicture, IMGUR_MEDIUM_THUMBNAIL)}
                className={classes.UserAvatar}
              />
            ) : (
              <Avatar
                alt={stateFirstName}
                src={!!stateProfilePictureUrl ? String(stateProfilePictureUrl) : 'fake-image-url'}
                className={classes.UserAvatar}
              />
            )}
          </label>
          <Button variant="outlined" onClick={handleRemovePicture}>
            Remove picture
          </Button>
          <TextField
            value={stateBio}
            onChange={(event) => setStateBio(event.target.value)}
            variant="outlined"
            margin="normal"
            id="bio"
            label="Bio"
            name="bio"
            fullWidth
            rows={3}
            multiline
          />
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <TextField
              value={stateUsername}
              onChange={(event) => setStateUsername(event.target.value)}
              variant="outlined"
              margin="normal"
              id="username"
              name="username"
              label="Username"
              fullWidth
              required
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              value={stateTag}
              onChange={(event) => setStateTag(event.target.value)}
              variant="outlined"
              margin="normal"
              id="tag"
              name="tag"
              label="Tag"
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <TextField
              value={stateFirstName}
              onChange={(event) => setStateFirstName(event.target.value)}
              name="firstName"
              margin="normal"
              variant="outlined"
              id="firstName"
              label="First Name"
              required
              fullWidth
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              value={stateLastName}
              onChange={(event) => setStateLastName(event.target.value)}
              variant="outlined"
              margin="normal"
              id="lastName"
              label="Last Name"
              name="lastName"
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Grid container className={classes.GridContainer}>
        <Grid item>
          <Button type="reset" variant="outlined" color="primary" onClick={handleReset}>
            REVERT CHANGES
          </Button>
        </Grid>
        <Grid item>
          {infoHasChanged() ? (
            <Button type="submit" variant="contained" color="primary">
              APPLY CHANGES
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary" disabled>
              APPLY CHANGES
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
}

export default EditPersonalInformation;
