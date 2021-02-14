import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Button, Grid, Hidden } from "@material-ui/core";
import TimeCard from "./TimeCard";
import QuestionCard from "./QuestionCard";
import QuestionPalette from "./QuestionPalette";
import { useDispatch, useSelector } from "react-redux";
import { submitExam, updateStatus } from "actions/examActions";
import { Prompt } from "react-router-dom";
import Remaining from "./Remaining";
import Legend from '../Legend'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop:70,
    flex:1,
    display:"flex"
  },
  side: {
    backgroundColor: theme.palette.primary.main,
    // height: "100vh",
    flex:1,
    paddingTop: 30,
    borderTopRightRadius: 30,
  },
  top:{
    padding:4,
    marginTop:4,
    marginBottom:8,
    backgroundColor: theme.palette.primary.main,

  }
}));

export default function Exam(props) {
  const classes = useStyles();
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const { loading, details, questions } = useSelector((state) => state.exam);
  const { info, type } = useSelector((state) => state.response);
  // TODO
    useEffect(() => {
      if(info.started===false) props.history.replace('/error')
  }, [])
  const onComplete = () => {
    console.log("called")
    dispatch(submitExam(props.history, details.id));

  };
  const onPrev = () => {
    setCurrent(current - 1);
  };
  const onNext = () => {
    if (current === questions.length - 1) onComplete();
    else setCurrent(current + 1);
  };
  const switchQuestion = (no) => {
    setCurrent(no);
  };
  useEffect(() => {
    window.onpopstate = (e) => {
      alert("Are you sure");
    };
    return () => {};
  }, []);
  useEffect(() => {
    window.addEventListener('blur', onBlur);
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('blur', onBlur);
    };
  });
  const onBlur = () => {
    console.log("onblur")
   onComplete()
  };
  const [open, setOpen] = React.useState(false);

  const handlePositive = () => {
    handleClose();
    onComplete();
  };
  const handleClickOpen = () => {
    dispatch(updateStatus());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container direction="row" className={classes.root}>
      {open && (
        <Remaining
          open={open}
          handleClose={handleClose}
          handlePositive={handlePositive}
        />
      )}
      {/* <Prompt message="Are you sure you wanna do that?" /> */}
      <Hidden mdDown>
        <Grid item lg={2} direction="column" className={classes.side}>
          <QuestionPalette switchQuestion={switchQuestion} current={current} />
          <TimeCard
            count={details.Duration * 60 * 1000}
            onComplete={onComplete}
            onClick={handleClickOpen}
            handleClose={handleClose}
          />
        </Grid>
      </Hidden>
      <Grid item direction="column" style={{flex:1}}>
        <Hidden lgUp>
          <Grid item direction="column" className={classes.top}>
            <TimeCard
              count={details.Duration * 60 * 1000}
              onComplete={onComplete}
              onClick={handleClickOpen}
              handleClose={handleClose}
            />
          </Grid>
        </Hidden>
        <QuestionCard current={current} onPrev={onPrev} onNext={onNext} />
        <Hidden lgUp>
          <Grid item direction="column" className={classes.top}>
            <QuestionPalette
              switchQuestion={switchQuestion}
              current={current}
            />
          </Grid>
        </Hidden>
        <Legend/>
      </Grid>
    </Grid>
  );
}
