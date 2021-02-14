import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Router from './router';

import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import VerificationPage from './pages/VerificationPage';

function App() {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return <Router />;
    // console.log(userSignin);
    // return (
    //     <Switch>
    //       <Route path="/signin" component={SigninPage} />
    //       <Route path="/signup" component={SignupPage} />
    //       <Route path="/verify" component={VerificationPage}/>
    //       <Route path="/" exact={true} component={SignupPage} />
    //       <Route component={Error} />
    //     </Switch>
    // );
}

export default App;
