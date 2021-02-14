import React,{useEffect} from "react";
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  useLocation,
  Prompt,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Exam from "./Exam";
import Details from "./Details";
import Complete from "./Complete";
import { Container, CssBaseline } from "@material-ui/core";
import Header from "components/headers/Header";
import {getExamWithID, resetResponse} from 'actions/examActions'
import SimpleLoading from "components/loading/SimpleLoading";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    margin: 0,
    display:"flex",
    overflow:"auto",
    flex:1,
    flexDirection:"column",
    "&.MuiContainer-root": {
      padding: 0,
      margin: 0,
    },
  height:"100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
export default function ExamPage(props) {
  const classes = useStyles();
  const {loading} = useSelector(state => state.exam) 
  const {info} = useSelector(state => state.response) 
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(resetResponse())
    if(props.match.params.id!="details"&&props.match.params.id!="start"&&props.match.params.id!="complete")
      dispatch(getExamWithID(props.match.params.id))
    window.onbeforeunload = () => true
    return () => {
    }
  }, [])
  if(loading) return <SimpleLoading open={loading}/>
  else
  return (
    <Container disableGutters={true} maxWidth={false} className={classes.root}>
      <CssBaseline />
      {/* <Prompt when={info.started===true} message="Do you want to quit exam" /> */} 
      {/* TODO */}
      {/* <Header
        color="white"
        brand="BestEnlist"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      /> */}
      <Switch>
        
        <Route exact path="/exam/details" component={Details} />
        <Route exact path="/exam/complete/:id" component={Complete} />
        <Route exact path="/exam/start" component={Exam} />
        <Route
          path="/exam/:id"
          render={() => <Redirect to="/exam/details" />}
        />
      </Switch>
    </Container>
  );
}
