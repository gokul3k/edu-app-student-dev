import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
      margin:8
  },
  paper:{
      padding:32,
  },
  duration:{
      fontWeight:"bold"
  },
  title:{
    fontWeight:"bold",
    marginBottom:8
  }
}));

export default function Info({ info,length }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid>
          <Grid>
            <Typography className={classes.title}>{info.Title}</Typography>
            {/* <Typography >Officia anim dolore qui quis dolor aliquip pariatur.</Typography> */}
          </Grid>
          <Grid container direction="row" justify="space-between">
            <Typography>Duration:<span className={classes.duration}>{info.Duration} mins</span></Typography>
            <Typography><span>{length} </span>questions</Typography>
            {/* <Typography><span>60 </span>marks</Typography> */}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
