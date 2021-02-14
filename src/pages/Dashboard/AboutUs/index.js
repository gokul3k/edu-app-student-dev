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
  viewMoreButton: {
    marginLeft: 17
  },
  subHeading:{
    marginTop: 23
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
      <Grid item lg md>
        <div className={classes.info}>
          <Typography variant="paragraph" color="primary" className={classes.title}><b>Greetings from Bestenlist Portal !</b></Typography>
          <br/>
          <Typography className={classes.description}>
            We have a lofty vision: to help every college student and recent graduate 
            to discover their career path. The world of work is constantly changing and evolving.
          </Typography>
        </div>
      </Grid>
      <Grid item lg md>
        <div className={classes.info}>
          <Typography variant="h5" color="primary" className={classes.subHeading}><b>Services We Provide: </b></Typography>
          <br/>
          <ol>
            <li><b>Online Assessment:</b> Through our online assessment find the best candidate for your organization.</li>
            <li><b>Self Assessment:</b> Assess yourself by taking the test find the best and areas which need to be improved.</li>
          </ol>
        </div>
      </Grid>
      <Grid item lg md>
        <div className={classes.info}>
          <Typography variant="h5" color="primary" className={classes.subHeading}><b>Who We Are...?</b></Typography>
          <br/>
          <Typography className={classes.description}>
          It has changed a lot since we started working and it will change more shortly. Technology plays an important 
          role and remains one of the main drivers. It is our job to prepare students for what will 
          likely be in the future. Complex problem solving, critical thinking, creative communication, and many more. 
          The valuable skills enlisted by corporates describes all about us.
          </Typography>
        </div>
      </Grid>
      <Grid item lg md>
        <div className={classes.info}>
          <Typography variant="h5" color="primary" className={classes.subHeading}><b>Reason For Choosing Bestenlist...</b></Typography>
          <br/>
          <Typography className={classes.description}>
          BestEnlist pairs with new job seekers to create or assist in opportunities that fit their degree, skill, and interest, 
          enriching the job and candidate search more efficiently on all perspectives.
          </Typography>
        </div>
      </Grid>
    </div>
  );
}
