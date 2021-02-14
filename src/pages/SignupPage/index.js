/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/userActions';
import Cookie from 'js-cookie';

import SimpleFooter from '../../components/SimpleFooter';
import SignupForm from '../../components/forms/SignupForm';
import SimpleHeader from '../../components/headers/SimpleHeader';
import styles from './SignupPage.module.css';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//for alert in snack
function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function SignupPage(props) {
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, status } = userRegister;

    const dispatch = useDispatch();
    //for snack
    const [snk, setSnk] = useState({});
    // const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    //form onsubmit
    const onSubmit = ({ email, pass2 }) => {
        console.log('hi', email, pass2);
        dispatch(register(email, pass2));
    };

    //if submit status is changed
    useEffect(() => {
        console.log('useEff', userRegister);
        if (status === 200 && !loading) {
            if (Cookie.get('regRe')) props.history.push('/verify');
        }
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
    }, [loading, error, status, userRegister, props.history]);

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

    const goToLogin = () => {
        console.log('niknas');
        props.history.push('/signin');
    };

    return (
        <div className={styles.signup_page_container_fluid}>
            <div>{showSnackbar()}</div>
            {/* <SimpleHeader goToLogin={goToLogin} loc='signin' /> */}
            <div className={styles.signup_page_contents}>
                <div className={`${styles.signup_page_card_container} row`}>
                    <div
                        className={`${styles.signup_page_card_details} col-lg-8`}
                    >
                        {/* <Image
                            className={`${styles.signup_page_card_image} d-none d-lg-block d-md-block`}
                            src='./images/undraw_certification_aif8.png'
                        /> */}
                        <div className={styles.new_content} >
                            <h4 className={styles.new_heading}>Greetings from Best Enlist</h4>
                            <p className={styles.new_para}>We have a lofty vision: to help every college student and recent graduate to discover their career path.
                            The world of work is constantly changing and evolving.</p>
                            <p className={styles.new_para}>It has changed a lot since we started working and it will change more shortly. Technology plays an important role and remains one of the main drivers.
                            It is our job to prepare students for what will likely be in the future. Complex problem solving, critical thinking, creative communication, and many more.
                            The valuable skills enlisted by corporates describes all about us.</p>
                            <p className={styles.new_para}>BestEnlist pairs with new job seekers to create or assist in opportunities that fit their degree, skill, and interest, enriching the job and candidate search more efficiently on all perspectives.</p>
                        </div>
                        <p className={styles.signup_page_brand}> BestEnlist Portal</p>
                        <Button
                            onClick={() => goToLogin()}
                            variant='contained'
                            className={styles.signup_page_signin_button}
                            disableElevation
                        >
                            Already have an account? Login
                        </Button>
                    </div>
                    <div className={`col-lg ${styles.form_container}`}>
                        <div>
                            <p className={styles.signup_welcome_text}>
                                Welcome
                            </p>
                            {/* {SignupForm()} */}
                            <SignupForm onSubmit={onSubmit} />
                            {/* <div
                                style={{
                                    display: 'flex',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    margin: '16px',
                                }}
                            >
                                <Link className={styles.signup_page_toc}>
                                    Terms and conditions
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <SimpleFooter /> */}
        </div>
    );
}
export default SignupPage;
