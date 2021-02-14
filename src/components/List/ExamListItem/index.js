import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Button, Chip, CircularProgress, Divider, Grid, Paper, Typography } from "@material-ui/core";
import api from 'api/api'
import { getCredentials } from 'services/authService'
import Snack from 'components/Snack'
import { blue } from "@material-ui/core/colors";


const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingLeft:8,
    paddingBottom:2,
    paddingTop:2,
    backgroundColor:theme.palette.primary.main,
    borderTopLeftRadius:4,
    borderTopRightRadius:4,
  },
  paper: {
    marginBottom: 24,
    maxWidth: 747
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
    color: "white"
  },
  pracBtn: {
    backgroundColor: theme.palette.success.main,
    color: "white"
  },
  subTitle: {
    color: "grey",
    fontSize: 16,
  },
  hard: { backgroundColor: "red", color: "white" },
  easy: { backgroundColor: "green", color: "white" },
  medium: { backgroundColor: '#fcb200', color: "white" },
}));


export default function ExamListItem({ data, history }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const isAvailable = async (examId) => {
    setLoading(true)
    try {
      const { data } = await api.post('/enterExamByTimestamp', { examId },
        {
          headers: {
            Authorization: `Bearer ${getCredentials()}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false)
      if (data.response) {
        history.push("/exam/" + examId)
      }
      else {
        setLoading(false)
        setOpen(true)
      }
    } catch (error) {
      setLoading(false)
      setOpen(true)

    }
  };
  return (
    <Paper className={classes.paper} elevation={3}>
      {open && (<Snack open={open} message="Exam not available" severity="error" setOpen={setOpen} />)}

      <Grid alignItems="center">
        <Typography className={classes.title}>{data.Title}</Typography>
        <Divider />
        <div style={{padding:8}}>
        <Chip size='small' className={data.Difficulty === 'hard' ? classes.hard : (data.Difficulty === 'medium' ? classes.medium : classes.easy)} label={data.Difficulty} />&nbsp;

          <ul>
          <li>
            <Typography className={classes.subTitle}> Duration:&nbsp;{data.Duration}&nbsp;mins</Typography>
          </li>
          <li>
            <Typography className={classes.subTitle}> Starts: {moment(data.StartDate).format("MMM Do YYYY")};&nbsp;Time:&nbsp;{data.StartTime}</Typography>
          </li>
        </ul></div>
      </Grid>
      <Grid container alignItems="flex-end" justify="flex-end">
        {data.ExamCompleted === "pending" && (<Button
          size="small"
          variant="contained"
          // color="primary"
          disableElevation
          style={{marginRight:8,marginBottom:8}}
          onClick={() => isAvailable(data.id)}
          className={data.Practise === 'yes' ? classes.pracBtn : classes.btn}
        >
          {!loading && data.Practise === 'yes' ? "Practise" : "Start test"}
          {loading && <CircularProgress size={20}
            style={{ color: "white" }} />}
        </Button>)}
      </Grid>
    </Paper>
  );
}
