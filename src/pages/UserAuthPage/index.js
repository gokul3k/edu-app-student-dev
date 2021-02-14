import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import  Signin  from './Signin';
import  Signup  from './Signup';
import {Switch,Route} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
root:{
    overflow:'auto',
    scrollbarWidth:'thin',
    scrollbarColor:theme.palette.primary.main,
    height:'100vh',
    display:"flex",
    alignItems:'center',
    justifyContent:"center",
    width:"100% !important",
    backgroundImage: "url('../../../assets/images/loginbg.png')",
    // backgroundColor:"blue",
    backgroundPosition: 'center',
    backgroundRepeat:' no-repeat',
    backgroundSize: 'cover',
    padding:0,
    margin:0,
}
}));


export default function UserAuthPage() {
  const classes = useStyles();

  return (
 <div className={classes.root} >
     <Switch>
         <Route exact path='/auth' component={Signin}/>
         <Route exact path='/auth/new' component={Signup}/>
     </Switch>
    
 </div>
  );
}