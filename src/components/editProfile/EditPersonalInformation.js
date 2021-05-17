import React, { useContext } from 'react';
import { Avatar, Button, Divider, Grid, makeStyles, TextField, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useMutation } from '@apollo/client';

import AuthenticatedUserContext from '../../contexts/AuthenticatedUserContext';

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
  },
  UserAvatar: {
    width: theme.spacing(26),
    height: theme.spacing(26),
    fontSize: Number(theme.spacing(13)),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EditPersonalInformation() {
  const classes = useStyles();

  const { authenticatedUserInfo, setAuthenticatedUserInfo } = useContext(AuthenticatedUserContext);

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
  const [stateLastName, setStateLastName] = React.useState(contextLastName);
  const [stateBio, setStateBio] = React.useState(contextBio);
  const [stateProfilePicture, setStateProfilePicture] = React.useState(contextProfilePicture);

  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const handleSuccessClose = () => setSuccessOpen(false);
  const handleErrorClose = () => setErrorOpen(false);

  const infoHasChanged = () => {
    const hasChanged =
      contextUsername !== stateUsername ||
      contextTag !== stateTag ||
      contextFirstName !== stateFirstName ||
      contextLastName !== stateLastName ||
      contextBio !== stateBio;
    return hasChanged;
  };

  const handleReset = () => {
    setStateUsername(contextUsername);
    setStateTag(contextTag);
    setStateFirstName(contextFirstName);
    setStateLastName(contextLastName);
    setStateBio(contextBio);
  };

  const [updateUser] = useMutation(UPDATE_PROFILE_INFORMATION, {
    onCompleted: (data) => {
      setSuccessOpen(true);
      setAuthenticatedUserInfo({ ...authenticatedUserInfo, ...data.updateUser });
    },
    onError: () => {
      handleReset();
      setErrorOpen(true);
    },
  });

  return (
    <>
      <form
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          await updateUser({
            variables: {
              username: stateUsername,
              tag: stateTag,
              firstName: stateFirstName,
              lastName: stateLastName,
              bio: stateBio,
            },
          });
        }}
      >
        <Grid container className={classes.GridContainer} spacing={1}>
          <Grid item lg={12} className={classes.ImageAndBio}>
            <input accept="image/*" className={classes.input} id="profile-picture" type="file" />
            <label htmlFor="profile-picture" className={classes.Label}>
              <Avatar
                alt={stateFirstName}
                src={String(stateProfilePicture)}
                className={classes.UserAvatar}
              />
            </label>
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
      <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success">
          User profile updated!
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
          Failed to update profile information
        </Alert>
      </Snackbar>
    </>
  );
}

export default EditPersonalInformation;
