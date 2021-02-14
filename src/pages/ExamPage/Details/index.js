import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Hidden,
  Checkbox,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import Instructions from "./Instructions";
import BasicInfo from "components/cards/BasicInfo";
import Info from "./Info";
import { useDispatch, useSelector } from "react-redux";
import {startExam} from 'actions/examActions'
import api from 'api/api'
import { getCredentials } from "services/authService";
import ResponsiveDialog from 'components/dialogs/ResponsiveDialog'
  
const useStyles = makeStyles((theme) => ({
  root: {
  overflow:"auto",
  margin:0,
  paddingTop:20,
  },
  paper: {
    padding:4,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  left: {
    // overflowY: "scroll",
    flex: 1,
    display: "flex",
    // scrollbarWidth: "thin",
    // scrollbarColor:"blue blue",
    "&::-webkit-scrollbar": {
      width: "0.1em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  right: {
    // overflow: "hidden",
    flex: 1,
    display: "flex",
    padding: 2,
  },
}));
export default function Details(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const {instructions,details,questions} = useSelector(state => state.exam) 
  const dispatch = useDispatch();
  const startExamClicked=async ()=>{
    try{
      await api.post('/updateExamStatus',
      {examId:details.id},{  headers: {
        Authorization: `Bearer ${getCredentials()}`,
        'Content-Type': 'application/json',
    }})
    }catch(err){}
    //TODO
    dispatch(startExam({st:Date.now(),started:true,Categories:details.Categories,count:questions.length,practise:details.Practise==='yes'?true:false}))
    props.history.push('/exam/start/')
  }
  useEffect(() => {
    if(!details.id) props.history.replace("/error")
    return () => {
      
    }
  }, [])
  const [open, setOpen] = React.useState(false);

  const handlePositive = ()=>{
    startExamClicked()
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      {open&&(<ResponsiveDialog  message="Are you sure you want to start the test?" title="Start Exam" positive="Begin" negative="Cancel"
          open={open} handleClose={handleClose} handlePositive={handlePositive} />)}
      <Grid container direction="row">
        <Grid item lg={9} className={classes.left} direction="column">
          <Info info={details} length={questions.length}/>
          <Instructions
            instructions={instructions}
          />
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            style={{marginLeft:8}}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  name="check"
                  color="primary"
                />
              }
              label="I have read the exam instructions carefully and I agree to take this test."
            />
            <Button
              disabled={!checked}
              color="primary"
              disableElevation
              variant="contained"
              style={{marginBottom:40}}
              onClick={handleClickOpen}
            >
              I am ready to begin
            </Button>
          </Grid>
        </Grid>
        <Hidden mdDown>
          <Grid
            item
            lg={3}
            className={classes.right}
            direction="column"
            alignItems="center"
            justify="flex-start"
          >
            <BasicInfo />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}
