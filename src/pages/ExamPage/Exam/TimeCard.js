import { Button, Paper, Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paper: {
    padding: 8,
    backgroundColor: theme.palette.primary.main,
  },
  time: {
    color:"white",
    fontSize: 18,
    fontWeight: "bold",
  },
  low: {
    color:"red",
    fontSize: 18,
    fontWeight: "bold",
  },
  btn:{
    backgroundColor:"white",
    color:theme.palette.secondary.main,
    fontWeight:"bold",
    borderRadius:50,
    paddingLeft:24,
    paddingRight:24,
  }
}));

export default function TimeCard({ count, onComplete, onClick }) {
  const classes = useStyles();
  const { info } = useSelector((state) => state.response);
  const checkTimeLow = (hr, m) => {
    if (hr === 0) if (m < 10) return true;
    return false
  };
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <p>Time up</p>;
    } else {
      // Render a countdown
      return (
        <Grid
          container
          direction="column"
          alignItems="center"
         
        >
          <Typography className={classes.time}>Time remaining</Typography>
          <Typography className={checkTimeLow(hours,minutes)?classes.low:classes.time}>
            {hours}:{minutes}:{seconds}
          </Typography>
        </Grid>
      );
    }
  };
  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Countdown onComplete={onComplete} date={info.st + count} renderer={renderer} />
        <Button
          variant="contained"
          style={{ marginTop: 4 }}
          disableElevation
          className={classes.btn}
          onClick={onClick}
        >
          Finish & Submit
        </Button>
      </Grid>
    </Paper>
  );
}
