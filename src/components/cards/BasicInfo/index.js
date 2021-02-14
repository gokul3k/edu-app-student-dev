import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {getUserInfo} from 'services/userService'

const useStyles = makeStyles((theme) => ({
  root: {
   marginTop:8
  },
  avatar:{
      width:150,
      height:150,
      marginBottom:4,
  },
  paper:{
      padding:32,
  }
}));

export default function BasicPagination() {
  const classes = useStyles();
  const {profileInfo,profilePic} = useSelector(state => state.userProfile)
  return (
    <div className={classes.root}>
        <Paper className={classes.paper} elevation={4}>
            <Grid container direction="column" alignItems="center">
                <Avatar src={profileInfo?profilePic:""} alt={profileInfo?profileInfo.details?profileInfo.details.fullname:"":""} className={classes.avatar}/>
                <Typography align="center">{profileInfo?profileInfo.details?profileInfo.details.fullname:"":""}</Typography>
                  <Typography align="center">{profileInfo?getUserInfo().email:""}</Typography>
            </Grid>
        </Paper>
    </div>
  );
}