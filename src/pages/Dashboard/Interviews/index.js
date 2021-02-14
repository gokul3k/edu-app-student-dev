import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getUpcommingExams } from "actions/examActions";
import { useDispatch, useSelector } from "react-redux";
import InterviewListItem from "components/List/InterviewListItem";
import { Grid, Typography, Button } from "@material-ui/core";
import api from 'api/api';
import { getCredentials } from 'services/authService';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import interviewEmpty from 'assets/images/interviewEmpty.png'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
    color: "#023e8a",
    fontWeight: "bold",
    marginBottom: 24
  },
  container: {
    padding: 24,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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
  },
  viewMoreButton:{
    marginLeft:17
  }
}));

export default function Interviews({ open, history }) {
  const classes = useStyles();
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    getInterviews();
  }, []);

  const getInterviews = async () => {
    try {
      setLoading(true);
      const res = await api.post(
        "/getInterviews",
        null,
        {
          headers: {
            Authorization: `Bearer ${getCredentials()}`,
            "Content-Type": "application/json",
          },
        }
      );

      setInterviews(res.data.response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className={classes.container}>
      <Typography className={classes.title}>Interview Listing</Typography>
      {
        (loading) ?
          (<Backdrop className={classes.backdrop} open={loading} >
            <CircularProgress color="primary" />
          </Backdrop>) :
          (interviews.length === 0)
          && (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.imageContainer}
            >
              <img src={interviewEmpty} className={classes.emptyImage} />
              <Typography className={classes.emptyText}>No interviews available</Typography>
              <Typography className={classes.emptyText}>Take a skill assessment for attending interviews</Typography>
            </Grid>
          )

      }
      <Grid container direction="row" alignItems="stretch" spacing={4}>

        {interviews.map((item, index) =>
          index <= 2 && (
            <Grid item lg={4}>
              <InterviewListItem data={item} history={history} />
            </Grid>)
        )}
      </Grid>
      <Grid container direction="row" alignItems="stretch" spacing={4}>
      {!more&&!loading&&interviews.length>3 && (<Button className={classes.viewMoreButton} color="primary" variant="contained" onClick={() => setMore(true)} >View More</Button>)}
      { interviews.map((item, index) =>
        index > 2 && more && (
          <Grid item lg={4}>
            <InterviewListItem data={item} history={history} />
          </Grid>)
      )}
        </Grid>
    </div>
  );
}
