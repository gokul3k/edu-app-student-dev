import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Button, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import eximg from 'assets/images/exam_complete.png'
import {clearResponse, resetResponse} from 'actions/examActions'


const useStyles = makeStyles((theme) => ({
  image: {
    maxWidth: "auto",
    maxHeight: 300,
  },
  imageContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  totalPaper:{
      padding:32,
      backgroundColor:theme.palette.success.main,
      color:"white",
      margin:16,
  },
  buttonGroup:{
    display:"flex",
    direction:"row",
  }
}));
export default function Complete(props) {
  const classes = useStyles();
 const  {result,info} = useSelector((state)=>state.response)
 const dispatch = useDispatch()
 useEffect(() => {
  var p; 
  console.log("info",info)
  try{
      p = info.practise
   }
   catch(e){p=false}
   dispatch(clearResponse())
   if(!p)
   setTimeout(() => {
     dispatch(resetResponse())
     props.history.replace({pathname:'/home/analysis',state:{default:props.match.params.id}})
   }, 3000);

 }, [])
 const renderMsg= ()=>{

 }
  return (
    <div className={classes.imageContainer}>
      <img
        // src="url(../../../assets/images/exam_complete.png)"
        src={eximg}
        className={classes.image}
      />
      <h1>Exam Completed</h1>
      <Typography variant="subtitle2"><b>Redirecting you to analysis screen now...</b></Typography>
      <p> Otherwise click on HOME button to proceed to home page</p>
      {renderMsg()}
      <div className={classes.buttonGroup}>
      <Button
        onClick={() => props.history.replace("/home")}
        variant="contained"
        color="primary"
        style={{margin:4}}
      >
        Home
      </Button>
      <Button
        onClick={() => props.history.replace({pathname:'/home/analysis',state:{default:props.match.params.id}})}
        variant="contained"
        color="success"
        style={{margin:4}}
      >
        Analysis
      </Button>
      </div>
      {result &&(
      <Grid container direction="row" alignItems="center" justify="center" >
          <Paper className={classes.totalPaper}>
              <Grid container direction="column" alignItems="center" justify="center">
                  <Typography variant="h4">Total score</Typography>
                  <Typography variant="body1">{result.total}</Typography>
              </Grid>
          </Paper>
      </Grid>
      )}
    </div>
  );
}
