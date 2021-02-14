import React, { useEffect } from "react";
import Cookie from "js-cookie";
// import SidePanel from '../../components/SidePanel';
import DashboardHome from "./Home";
import UserProfile from "./UserProfile";
import Suggestions from './Suggestions';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Footer from 'components/Footer';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  useLocation,
} from "react-router-dom";
import { getUserInfo } from "services/userService";
import Header from "components/headers/Header";
import HeaderLinks from "components/headers/Header/HeaderLinks";
import { logout } from 'actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Analysis from "./Analysis";
import { makeStyles } from "@material-ui/core/styles";
import Exams from "./Exams";
import Interviews from "./Interviews";
const useStyles = makeStyles((theme) => ({
  container:{
    flex:1,
    overflowY:'auto',
    overflowX:'hidden',
    scrollbarWidth:"thin",
    scrollbarColor:theme.palette.primary.main
  }
}));

function Dashboard(props) {
    const dispatch = useDispatch();
    const classes = useStyles();

  useEffect(() => {
    Cookie.remove("regRe");
    Cookie.remove("signRe");
    // if (getUserInfo().isReg != "true") props.history.push("/register");
  });
  const logoutClicked=()=>{
    dispatch(logout(props.history))
  }
  return (
    <div className={classes.container}>
      <Header
        color="white"
        brand="BestEnlist"
        logoutClicked={logoutClicked}
        rightLinks={<HeaderLinks />}
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      />
      <div className={classes.subContainer}>
        {/* <h4 className={styles.firstDivText}>
                    Complete your profile to access your dashboard
                </h4> */}
        {/* </div> */}
        <div className={classes.secondDiv2}>
          <Switch>
            <Route exact path="/home" component={DashboardHome} />
            <Route exact path="/home/AboutUs" component={AboutUs} />
            <Route exact path="/home/analysis" component={Analysis} />
            <Route exact path="/home/carrier" component={Suggestions} />
            <Route exact path="/home/exams" component={Exams} />
            <Route exact path="/home/interviews" component={Interviews} />
            <Route exact path="/home/contactus" component={ContactUs} />
            <Route exact path="/home/profile" component={UserProfile} />
            {/* <Route path="/app/exams/details/:id" component={ExamDetails} /> */}
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
