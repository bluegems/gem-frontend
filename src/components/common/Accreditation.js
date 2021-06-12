import { makeStyles, Typography } from '@material-ui/core';
import { GitHub, Instagram, LinkedIn } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  AccreditationDiv: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    display: 'flex',
    justifyContent: 'space-arund',
    alignItems: 'center',
    width: '100vw',
    height: '10vh',
  },
  AccreditationBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '33%',
  },
  AccreditationLine: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
}));

function Accreditation() {
  const classes = useStyles();
  return (
    <div className={classes.AccreditationDiv}>
      <div className={classes.AccreditationBlock}>
        <Typography variant="body1">Art by Pramath Karthik</Typography>
        <div className={classes.AccreditationLine}>
          <NewTabLink href="https://www.instagram.com/pramathkarthik/" title="pramathkarthik">
            <Instagram />
          </NewTabLink>
        </div>
      </div>
      <div className={classes.AccreditationBlock}>
        <Typography>Developed by Parinith Shekar</Typography>
        <div className={classes.AccreditationLine}>
          <NewTabLink href="https://github.com/parinithshekar" title="parinithshekar">
            <GitHub />
          </NewTabLink>
          <NewTabLink
            href="https://www.linkedin.com/in/parinith-iyer-398456129/"
            title="Parinith Iyer"
          >
            <LinkedIn />
          </NewTabLink>
        </div>
      </div>
      <div className={classes.AccreditationBlock}>
        <Typography variant="body1">
          Bluegems icon made by{' '}
          <NewTabLink href="https://www.freepik.com" title="Freepik">
            Freepik
          </NewTabLink>{' '}
        </Typography>
        <div className={classes.AccreditationLine}>
          <Typography variant="body1">
            from{' '}
            <NewTabLink href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </NewTabLink>
          </Typography>
        </div>
      </div>
    </div>
  );
}

const NewTabLink = ({ children, ...rest }) => (
  <a {...rest} target="_blank" rel="noreferrer noopener">
    {children}
  </a>
);

export default Accreditation;
