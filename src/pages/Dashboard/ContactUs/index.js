import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import api from 'api/api';
import { getCredentials } from 'services/authService';

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
      <Grid item lg md>
        <div className={classes.info}>
          <Typography variant="paragraph" color="primary" className={classes.title}><b>Reach Us At</b></Typography>
          <br/>
          <Typography className={classes.description}>
            Email: <a href="mailto:info@bestenlist.com">info@bestenlist.com</a>
          </Typography>
        </div>
      </Grid>
    </div>
  );
}
