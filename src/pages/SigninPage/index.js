/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
// import { Link } from '''dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin, logout, resetPassword } from '../../actions/userActions';
import SimpleFooter from '../../components/SimpleFooter';
import SimpleHeader from '../../components/headers/SimpleHeader';
import SigninForm from '../../components/forms/SigninForm';
import styles from './SigninPage.module.css';
import Cookie from 'js-cookie';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { Image } from 'react-bootstrap';

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}
function SigninPage(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { loading, error, status } = userSignin;
    const dispatch = useDispatch();
    const [snk, setSnk] = useState({});
    const [open, setOpen] = React.useState(false);

    const onSubmit = ({ email, pass }) => {
        console.log('hi', email, pass);
        dispatch(signin(email, pass,props.history));
    };

    const goToSignup = () => {
        dispatch(logout);
        props.history.push('/signup');
    };

    // useEffect(() => {
    //     if (Cookie.get('tk')) props.history.replace('/');
    // });
    useEffect(() => {
        console.log('stattt', status, loading);
        // if (status === 200 && !loading) {
        //     if (Cookie.get('signRe') === true) props.history.replace('/');
        // }
        if (error) {
            if (status === 'XXXXX') {
                //already signed up
                // props.history.push("/signin");
            } else if (status === 'xxx') {
                // props.history.push("/verify");  //pending verification
            } else {
                setSnk({ sev: 'error', msg: error.error });
                setOpen(true);
            }
        }
        if (loading) {
            setSnk({ sev: 'info', msg: 'Submitting' });
            setOpen(true);
        }
        return () => {
            //
        };
    }, [loading, error, status, props.history]);

    const resetPasswordOnSubmit = (email) => {
        console.log("res", email)
        dispatch(resetPassword(email));

    }

    //snackbar close
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnk({});
        setOpen(false);
    };
    const showSnackbar = () => {
        return (
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={snk.sev}>
                    {snk.msg}
                </Alert>
            </Snackbar>
        );
    };
    return (
        <div className={styles.signin_page_container_fluid}>
            <div>{showSnackbar()}</div>
            {/* <SimpleHeader goToSignup={goToSignup} loc='login' /> */}

            <div className={styles.signin_page_contents}>
                <div className={`row ${styles.signin_page_card_container}`}>
                    <div
                        className={`col-lg-8 ${styles.signin_page_card_details}`}
                    >
                        {/* <Image
                            className={`${styles.signin_page_card_image} d-none d-lg-block`}
                            src='./images/undraw_certification_aif8.png'
                        /> */}
                        <div className={styles.new_content}>
                            <h4 className={styles.new_heading}>Greetings from Best Enlist</h4>
                            <p className={styles.new_para}>We have a lofty vision: to help every college student and recent graduate to discover their career path.
                            The world of work is constantly changing and evolving.</p>
                            <p className={styles.new_para}>It has changed a lot since we started working and it will change more shortly. Technology plays an important role and remains one of the main drivers.
                            It is our job to prepare students for what will likely be in the future. Complex problem solving, critical thinking, creative communication, and many more.
                            The valuable skills enlisted by corporates describes all about us.</p>
                            <p className={styles.new_para}>BestEnlist pairs with new job seekers to create or assist in opportunities that fit their degree, skill, and interest, enriching the job and candidate search more efficiently on all perspectives.</p>
                        </div>
                        <div className={styles.register_content}>
                            <p className={styles.signin_page_brand}> New to our Portal ? Click below to signup.</p>
                            <Button
                                onClick={() => goToSignup()}
                                variant='contained'
                                className={styles.signin_page_signup_button}
                                disableElevation
                            >
                                Create new account
                        </Button>
                        </div>
                    </div>
                    <div className={`col-lg ${styles.form_container}`}>
                        <div>
                            <p className={styles.signin_page_welcome_text}>
                                Welcome
                            </p>
                            <p className={styles.signin_page_welcome_sub}>
                                Signin to your account
                            </p>
                            <SigninForm onSubmit={onSubmit} resetPasswordOnSubmit={resetPasswordOnSubmit} />
                            {/* <div
                                style={{ textAlign: 'center', margin: '16px' }}
                            >
                                <a className={styles.signin_page_privacy}>
                                    privacy policy
                                </a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <SimpleFooter /> */}
        </div>
    );
}
export default SigninPage;
