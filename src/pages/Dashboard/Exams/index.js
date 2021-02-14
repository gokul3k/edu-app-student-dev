import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getUpcommingExams } from "actions/examActions";
import { useDispatch, useSelector } from "react-redux";
import ExamListItem from "components/List/ExamListItem";
import { Typography, Grid,Button } from "@material-ui/core";
import SimpleLoading from "components/loading/SimpleLoading";
import emptyExam from 'assets/images/emptyExam.png';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
    color: "#023e8a",
    fontWeight: "bold",
    marginBottom: 24
  },
  container: {
    padding: 32,
  },
  emptyImage: {
    maxWidth: 1000,
    maxHeight: 400
  },
  imageContainer: {
    width: "100%"
  },
  emptyText: {
    color: "#e63946",
    fontWeight: "bold"
  }
}));

export default function Exams({ open, history }) {
  const classes = useStyles();
  const { upcomingExams, examloading } = useSelector(
    (state) => state.upcomingExams
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUpcommingExams());
  }, []);
  const [more, setMore] = useState(false)
  
  return (
    <div className={classes.container}>
      {examloading&&<SimpleLoading open={examloading} />}
      {!examloading &&(<>
      
      <Typography className={classes.title}>Upcoming exams</Typography>
      { upcomingExams.length === 0 && (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.imageContainer}
        >
          <img src={emptyExam} className={classes.emptyImage} />
          <Typography className={classes.emptyText}>No upcomming exams</Typography>
        </Grid>
      )
      
    }
    <Grid container direction="row" alignItems="stretch" spacing={4}>
      {
        upcomingExams && upcomingExams.map((item, index) => index<=2&&(
          <Grid item lg={4}>
          <ExamListItem data={item} history={history} />
          </Grid>
        ))}
        </Grid>
    {!more&&upcomingExams.length>3 &&(<Button color="primary" variant="contained" onClick={()=>setMore(true)}>View more</Button>)}
    <Grid container direction="row" alignItems="stretch" spacing={4}>
      {
        upcomingExams && upcomingExams.map((item, index) => index>2&&!examloading&&more&&(
          <Grid item lg={4}>
          <ExamListItem data={item} history={history} />
          </Grid>
        ))}
        </Grid>
        </>)}
    </div>
  );
}
