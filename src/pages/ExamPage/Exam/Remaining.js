import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme)=>({
    paper:{
        display:"flex",
        padding:24,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        margin:8.
    }
}))

export default function Remaining({open,handleClose,handlePositive}) {
    const theme = useTheme();
    const classes= useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const {info,type} = useSelector(state => state.response) 

  return (
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="remaining-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="remaining-dialog-title">Submit Exam</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Typography>Do you want to submit exam</Typography>
           {info && (<><Grid container direction="row" justify="space-evenly">
                <Grid item>
                    <Paper elevation={0} variant="outlined" className={classes.paper}>
                        <Typography>Answerd</Typography>
                        <Typography>{info.answered}/{info.count}</Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper elevation={0} variant="outlined" className={classes.paper}>
                        <Typography>Flagged</Typography>
                        <Typography>{info.flagged}</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container direction="row" justify="space-evenly">
            {Object.keys(info.Categories).map((key)=>(

                <Grid item>
                    <Paper elevation={0} variant="outlined" className={classes.paper}>
                        <Typography>{key}</Typography>
                        <Typography>{type[key]||"0"}/{info.Categories[key]}</Typography>
                    </Paper>
                </Grid>
            ))}
            </Grid></>)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            cancel
          </Button>
          <Button onClick={handlePositive} color="primary" autoFocus>
            submit
          </Button>
        </DialogActions>
      </Dialog>
  );
}