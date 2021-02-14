import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  current: {
    color: "white",
    backgroundColor: theme.palette.primary.light,
    maxWidth: 50,
    margin: 4,
    padding: 4,
    height: 30,
    width: 30,
    minWidth: 30,
    borderRadius:4,
  },
  flag: {
    color: "white",
    backgroundColor: "grey",
    maxWidth: 50,
    minWidth: 30,
    margin: 4,
    padding: 4,
    height: 30,
    width: 30,
    borderRadius:4,
  },
  ans: {
    color: "white",
    backgroundColor: "green",
    minWidth: 30,
    maxWidth: 50,
    margin: 4,
    padding: 4,
    height: 30,
    width: 30,
    borderRadius:4,
  },
  unans: {
    color: "black",
    backgroundColor: "white",
    minWidth: 30,
    maxWidth: 50,
    margin: 4,
    padding: 4,
    height: 30,
    width: 30,
    borderRadius:4,
    border:"1px solid blue"
  },
  paper:{
      margin:24,
      padding:16,
  },
  title:{
      color:theme.palette.primary.main,
      fontWeight:"bold",
  }
}));

export default function Legend() {
  const classes = useStyles();
  return (
      <Paper className={classes.paper}>
    <Grid container="column">
    <Typography className={classes.title}>Info</Typography>
      <Grid container direction="row" alignItems="center">
        <div className={classes.current}></div>
        <Typography>Current</Typography>
      </Grid>
      <Grid container direction="row" alignItems="center">
        <div className={classes.flag}></div>
        <Typography>Flagged</Typography>
      </Grid>
      <Grid container direction="row" alignItems="center">
        <div className={classes.ans}></div>
        <Typography>Answered</Typography>
      </Grid>
      <Grid container direction="row" alignItems="center">
        <div className={classes.unans}></div>
        <Typography>Unanswered</Typography>
      </Grid>
    </Grid>
    </Paper>
  );
}
