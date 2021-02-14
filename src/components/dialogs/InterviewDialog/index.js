import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Grid, makeStyles } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  grid: {
    marginRight: 32
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFA500"
  },
  subHeading: {
    fontWeight: "bold"
  }
}));

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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({ open, handleClose, data }) {

  const classes = useStyles();

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Interview Details
        </DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            direction="row"
          >
            <Grid
              className={classes.grid}
              item
              direction="column"
            >
              <Grid
                item
                direction="row"
              >
                <p className={classes.heading}>Interview Name : </p>
                <h6 className={classes.subHeading}>{data.InterviewName}</h6>
              </Grid>
              <Grid
                item
                direction="row"
              >
                <p className={classes.heading}>Interview By : </p>
                <h6 className={classes.subHeading}>{data.InterviewBy}</h6>
              </Grid>
              <Grid
                item
                direction="row"
              >
                <p className={classes.heading}>Status : </p>
                <h6 className={classes.subHeading}>{data.Status}</h6>
              </Grid>
            </Grid>

            <Grid
              item
              direction="column"
            >
              <Grid
                item
                direction="row"
              >
                <p className={classes.heading}>Interview Date : </p>
                <h6 className={classes.subHeading}>{data.Date}</h6>
              </Grid>
              <Grid
                item
                direction="row"
              >
                <p className={classes.heading}>Number of Participants : </p>
                <h6 className={classes.subHeading}>{data.TotalCandidates}</h6>
              </Grid>
            </Grid>

          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}