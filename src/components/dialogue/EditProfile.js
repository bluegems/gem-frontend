import React from 'react';

import { Button, Dialog, DialogContent, IconButton, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import EditPersonalInformation from '../editProfile/EditPersonalInformation';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function EditProfile() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Edit Profile
      </Button>
      <Dialog onClose={handleClose} open={open} maxWidth="xs" fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Profile
        </DialogTitle>
        <DialogContent>
          <EditPersonalInformation />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditProfile;
